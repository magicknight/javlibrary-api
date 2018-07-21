
/* global describe it */

var assert = require('assert');
var helper = require('../utils/helper');

describe('helper', function() {
    describe('getVideoID', function() {
        it('return the video id', function() {
            assert.strictEqual(
                helper.getVideoID('videoreviews.php?v=javli4qtzi&mode=2'),
                'javli4qtzi'
            );
        });
    });

    describe('getDirectorID', function() {
        it('return the director id', function() {
            assert.strictEqual(
                helper.getDirectorID('vl_director.php?d=p4'),
                'p4'
            );
        });
    });

    describe('getMakerID', function() {
        it('return the maker id', function() {
            assert.strictEqual(
                helper.getMakerID('vl_maker.php?m=m46a'),
                'm46a'
            );
        });
    });

    describe('getLabelID', function() {
        it('return the label id', function() {
            assert.strictEqual(
                helper.getLabelID('vl_label.php?l=arace'),
                'arace'
            );
        });
    });

    describe('getTagID', function() {
        it('return the tag id', function() {
            assert.strictEqual(
                helper.getTagID('vl_genre.php?g=lq'),
                'lq',
            );
        });
    });

    describe('getCastID', function() {
        it('return the cast id', function() {
            assert.strictEqual(
                helper.getCastID('vl_star.php?s=pqaq'),
                'pqaq',
            );
        });
    });

    describe('getLargeImage', function() {
        it('return the large image', function() {
            assert.strictEqual(
                helper.getLargeImage('http://pics.dmm.co.jp/digital/video/bbi00142/bbi00142-1.jpg'),
                'http://pics.dmm.co.jp/digital/video/bbi00142/bbi00142jp-1.jpg',
            );
        });
    });
});
