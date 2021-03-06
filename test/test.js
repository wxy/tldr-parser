const assert = require('assert');
const fs = require('fs');
const path = require('path');
const parser = require('../index.js');

describe('Parser can Parse', function() {
  before(function() {
    this.fileContent = fs.readFileSync(path.join(__dirname, './7z.md'), 'utf8');
  });

  it('should get title', function() {
    const obj = parser.parse(this.fileContent);
    assert.equal('7z', obj.name);
  });

  it('should get description', function() {
    const obj = parser.parse(this.fileContent);

    /**
       * 对比 Description
       * 此处有坑，assert.equal 无法对比数组、Object, 需要使用 deepEqual
       * @type {[type]}
       */
    assert.deepEqual([
      'A file archiver with high compression ratio.',
      'Homepage: <https://www.7-zip.org/>.',
    ], obj.description);
  });

  it('should get Example', function() {
    const obj = parser.parse(this.fileContent);
    assert.deepEqual([
      {
        'description': 'Archive a file or folder',
        'command': '7z a {{archived.7z}} {{path/to/file}}',
      },
      {
        'description': 'Encrypt an existing archive (including headers)',
        'command': '7z a {{encrypted.7z}} -p{{password}} -mhe {{archived.7z}}',
      },
    ], obj.examples);
  });
});

describe('Parser can Build', function() {
  it('should generate markdown', function() {
    fileContent = fs.readFileSync(path.join(__dirname, './7z.md'), 'utf8');
    const obj = parser.parse(fileContent);
    const buildContent = parser.build(obj);
    assert.equal(fileContent, buildContent);
  });
});
