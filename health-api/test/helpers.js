var supertest = require('supertest');
var chai = require('chai');
var uuid = require('uuid');
var app = require('../app.js');
var should = require('chai').should();
//var request = require('supertest');

global.app = app;
global.uuid = uuid;
global.expect = chai.expect;
global.request = supertest(app);
global.should = should;