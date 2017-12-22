
/* global describe it */

var assert = require('assert');
var utils = require('../lib/utils');

describe('utils', function() {
    describe('getVideoID', function() {
        it('return the video id', function() {
            assert.equal(
                utils.getVideoID('videoreviews.php?v=javli4qtzi&mode=2'),
                'javli4qtzi'
            );
        });
    });

    describe('getDirectorID', function() {
        it('return the director id', function() {
            assert.equal(
                utils.getDirectorID('vl_director.php?d=p4'),
                'p4'
            );
        });
    });

    describe('getMakerID', function() {
        it('return the maker id', function() {
            assert.equal(
                utils.getMakerID('vl_maker.php?m=m46a'),
                'm46a'
            );
        });
    });

    describe('getLabelID', function() {
        it('return the label id', function() {
            assert.equal(
                utils.getLabelID('vl_label.php?l=arace'),
                'arace'
            );
        });
    });

    describe('getTagID', function() {
        it('return the tag id', function() {
            assert.equal(
                utils.getTagID('vl_genre.php?g=lq'),
                'lq',
            );
        });
    });

    describe('getCastID', function() {
        it('return the cast id', function() {
            assert.equal(
                utils.getCastID('vl_star.php?s=pqaq'),
                'pqaq',
            );
        });
    });

    describe('getLargeImage', function() {
        it('return the large image', function() {
            assert.equal(
                utils.getLargeImage('http://pics.dmm.co.jp/digital/video/bbi00142/bbi00142-1.jpg'),
                'http://pics.dmm.co.jp/digital/video/bbi00142/bbi00142jp-1.jpg',
            );
        });
    });
});
