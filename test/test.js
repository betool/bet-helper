'use strict';

import { expect } from 'chai';
import helper from '../src/index';


describe('getCurrentTime', () => {
  it('should return timestamp', () => {
    const time = helper.getCurrentTime();
    expect(time).to.be.a('number');
  });
});

describe('parseJson', () => {
  it('should parseJson without errors', () => {
    const string = '{"foo": "bar", "bool": true}';
    const json = helper.parseJson(string);
    expect(json).to.have.property('foo')
      .and.equal('bar');
    expect(json).to.have.property('bool')
      .and.to.be.true;
  });

  it('should parseJson return null', () => {
    const string = 'foo';
    const json = helper.parseJson(string);
    expect(json).to.be.null;
  });
});

describe('stringifyJson', () => {
  it('should stringifyJson without errors', () => {
    const json = {
      foo: 'bar',
      bool: true,
    };
    const string = helper.stringifyJson(json);
    expect(string).to.be.a('string');
  });

  it('should stringifyJson return null', () => {
    const json = {};
    json.json = json;
    const string = helper.stringifyJson(json);
    expect(string).to.be.null;
  });
});

describe('random', () => {
  it('should return number', () => {
    const rnd = helper.random(0, 1);
    expect(rnd).to.be.a('number');
  });

  it('should return 1', () => {
    const rnd = helper.random(1, 1);
    expect(rnd).to.be.equal(1);
  });

  it('should above 20', () => {
    const rnd = helper.random(21, 100);
    expect(rnd).to.be.above(20);
  });

  it('should at least 20', () => {
    const rnd = helper.random(20, 100);
    expect(rnd).to.be.at.least(20);
  });

  it('should below 100', () => {
    const rnd = helper.random(0, 100);
    expect(rnd).to.be.below(101);
  });
});

describe('buildLocation', () => {
  const base = {
    protocol: 'https',
    ptc: 'c.php',
  };

  const hostname = {
    hostname: 'ya.ru',
  };

  const port = {
    port: '4040',
  };

  const prefix = {
    prefix: 'prefix',
  };

  it('should build default location', () => {
    const location = helper.buildLocation();
    expect(location).to.be.a('object');
    expect(location).to.have.property('protocol')
      .and.equal('http');
    expect(location).to.have.property('ptc')
      .and.equal('config.json');
  });

  it('should build location with base config', () => {
    const loc = Object.assign({}, base);
    const location = helper.buildLocation(loc);
    expect(location).to.have.property('protocol')
      .and.equal(loc.protocol);
    expect(location).to.have.property('ptc')
      .and.equal(loc.ptc);
  });

  it('should build location with hostname', () => {
    const loc = Object.assign({}, base, hostname);
    const config = `${loc.protocol}://${loc.hostname}/${loc.ptc}`;
    const location = helper.buildLocation(loc);
    expect(location).to.have.property('protocol')
      .and.equal(loc.protocol);
    expect(location).to.have.property('ptc')
      .and.equal(loc.ptc);
    expect(location).to.have.property('hostname')
      .and.equal(loc.hostname);
    expect(location).to.have.property('config')
      .and.equal(config);
  });

  it('should build location with port', () => {
    const loc = Object.assign({}, base, hostname, port);
    const config = `${loc.protocol}://${loc.hostname}:${loc.port}/${loc.ptc}`;
    const location = helper.buildLocation(loc);
    expect(location).to.have.property('protocol')
      .and.equal(loc.protocol);
    expect(location).to.have.property('ptc')
      .and.equal(loc.ptc);
    expect(location).to.have.property('hostname')
      .and.equal(loc.hostname);
    expect(location).to.have.property('port')
      .and.equal(loc.port);
    expect(location).to.have.property('config')
      .and.equal(config);
  });

  it('should build location with prefix', () => {
    const loc = Object.assign({}, base, hostname, port, prefix);
    const config = `${loc.protocol}://${loc.hostname}:${loc.port}/${loc.prefix}/${loc.ptc}`;
    const location = helper.buildLocation(loc);
    expect(location).to.have.property('protocol')
      .and.equal(loc.protocol);
    expect(location).to.have.property('ptc')
      .and.equal(loc.ptc);
    expect(location).to.have.property('hostname')
      .and.equal(loc.hostname);
    expect(location).to.have.property('port')
      .and.equal(loc.port);
    expect(location).to.have.property('prefix')
      .and.equal(loc.prefix);
    expect(location).to.have.property('config')
      .and.equal(config);
  });
});
