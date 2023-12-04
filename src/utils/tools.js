/* eslint-disable import/no-dynamic-require */
const config = require('config');
const moment = require('moment');
const Sequelize = require('sequelize');
const mongoose = require('mongoose');

const { GoogleSpreadsheet } = require('google-spreadsheet');
const { MailService } = require('@rumsan/core/services');
const { db, getUnixTimestamp } = require('./index');

const credsPath = '../../config/google.json';

const Pin = db.define(
  'pins',
  {
    phone: { type: Sequelize.STRING },
    pin: { type: Sequelize.STRING }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

const Settings = db.define(
  'settings',
  {
    key: { type: Sequelize.STRING },
    value: { type: Sequelize.STRING }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

const tools = {

  async syncFromGsheet() {
    const { docId, tabNumber } = config.get('services.gsheet');

    const doc = new GoogleSpreadsheet(docId);
    await doc.useServiceAccountAuth(require(credsPath));
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[tabNumber];
    const rows = await sheet.getRows();
    const data = rows.map(d => ({
      phone: d.phone,
      pin: d.pin,
      ward: d.ward || '',
      name: d.name || '',
      max_amount: d.max_amount
    }));
    await Pin.destroy({ where: {} });
    await Pin.bulkCreate(data);
    const res = await Pin.count();
    MailService.send({
      to: config.get('adminEmail'),
      subject: 'GSheet PIN synced',
      html: `${res} beneficiaries pins synced.`
    });
    console.log('gsheet-imported');
    return res;
  },

  async getSqlitePinsCount() {
    return Pin.count();
  },

  async updateServerStartDate() {
    Settings.update({ value: getUnixTimestamp() }, { where: { key: 'statedOn' } });
  },

  async getLastStartDate() {
    const data = await Settings.findOne({ where: { key: 'statedOn' } });
    const startOn = new Date(parseInt(data.value) * 1000);
    return {
      duration: moment(startOn).fromNow(),
      timestamp: data.value,
      date: startOn
    };
  }
};

module.exports = tools;
