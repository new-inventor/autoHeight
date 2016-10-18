/**
 * Created by george on 12.10.16.
 */

;(function ($) {
    var defaults = {
        minHeight: 30,
        maxHeight: -1,
        extendHeight: 2
    };

    var resultParams;

    function getHeight($textArea) {
        var height = getBaseHeight($textArea) + resultParams.extendHeight;
        if ($textArea.css('box-sizing') !== 'border-box') {
            return height;
        }
        var paddingTop = parseInt($textArea.css('padding-top'));
        var paddingBottom = parseInt($textArea.css('padding-bottom'));
        var borderTop = parseInt($textArea.css('border-top-width'));
        var borderBottom = parseInt($textArea.css('border-bottom-width'));
        var res = height + paddingTop + paddingBottom + borderTop + borderBottom;
        if (res < resultParams.minHeight) {
            return resultParams.minHeight;
        }
        if (res > resultParams.maxHeight && resultParams.maxHeight !== -1) {
            return resultParams.maxHeight;
        }
        return res;
    }

    function getBaseHeight($textArea) {
        var text = $textArea.val().replace(/\n/g, '</br>');
        if(text.lastIndexOf('</br>') === text.length - 5){
            text += '</br>';
        }
        var $div = $('<div></div>')
            .html(text)
            .css('width', (getTextAreaContentWidth($textArea)) + 'px')
            .css('word-wrap', 'break-word')
            .css('overflow', 'auto')
            .css('position', 'absolute')
            .css('left', '500px')
            .css('display', 'block')
            .css('line-height', $textArea.css('line-height'));
        $('body').append($div);
        var height = $div.height();
        $div.remove();

        return height;
    }

    function getTextAreaContentWidth($textArea) {
        return $textArea.innerWidth() -
            parseInt($textArea.css('padding-left')) -
            parseInt($textArea.css('padding-right')) -
            parseInt($textArea.css('border-left-width')) -
            parseInt($textArea.css('border-right-width'));//scroll width
    }

    $.autoHeight = {};
    $.autoHeight.setHeight = function ($el){
        $el.each(function (i) {
            $(this).css('height', getHeight($(this)) + 'px');
        });
    };

    $.fn.autoHeight = function (params) {
        resultParams = $.extend(true, defaults, params);

        $(this).on('input change', function (e) {
            var el = e.target;
            $.autoHeight.setHeight($(el));
        });

        $.autoHeight.setHeight($(this));
    }


})(jQuery);
