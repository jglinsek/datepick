/* http://keith-wood.name/datepick.html
 Datepicker extensions for jQuery v4.1.0.
 Written by Keith Wood (kbwood{at}iinet.com.au) August 2009.
 Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and
 MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses.
 Please attribute the author if you use it. */
/*
These are some more custom extensions written by James Glinsek (based on above).
https://github.com/jglinsek
* */

(function ($) { // Hide scope, no $ conflict

    var bootStrapRenderer = {
        picker: '<div{popup:start} id="datepicker-div"{popup:end} class="datepicker ' +
            'clearfix {inline:start} datepicker-inline{inline:end}">' +
            '<div class="datepicker-nav-header clearfix">' +
            '{link:prev}{link:today}{link:next}</div>{months}' +
            '{popup:start}<div class="datepicker-nav-footer clearfix">' +
            '{button:clear}{button:close}</div>{popup:end}' +
            '<div class="clearfix"></div></div>',
        monthRow: '<div class="datepicker-row-break">{months}</div>',
        month: '<div class="datepicker-group">' +
            '<div class="datepicker-header clearfix">{monthHeader:yyyy MM}</div>' +
            '<table class="datepicker-calendar table-condensed"><thead>{weekHeader}</thead><tbody>{weeks}</tbody></table></div>',
        weekHeader: '<tr>{days}</tr>',
        dayHeader: '<th>{day}</th>',
        week: '<tr>{days}</tr>',
        day: '<td>{day}</td>',
        monthSelector: '.datepicker-group',
        daySelector: 'td',
        rtlClass: 'datepicker-rtl',
        multiClass: 'datepicker-multi',
        defaultClass: 'datepicker-default',
        selectedClass: 'datepicker-active',
        highlightedClass: 'datepicker-highlight',
        todayClass: 'datepicker-today',
        otherMonthClass: 'datepicker-other-month',
        weekendClass: 'datepicker-week-end',
        commandClass: 'datepicker-cmd',
        commandButtonClass: 'btn',
        commandLinkClass: '',
        disabledClass: 'datepicker-disabled'
    };

    $.extend($.datepick, {

        bootStrapRenderer: bootStrapRenderer,

        selectRangeOnHover: function (date, selectable) {
            var $this,
                $datePicker,
                daysToHighlight,
                startDate,
                renderer;

            if (!selectable) return;


            $this = $(this);
            $datePicker = $this.data('datepick');
            if (!$datePicker.pickingRange) return;

            startDate = $datePicker.selectedDates[0];
            daysToHighlight = date.getNightsBetween(startDate);
            renderer = $datePicker.options.renderer;

            if (daysToHighlight >= 0) {
                $this.find('.' + renderer.selectedClass)
                    .removeClass(renderer.selectedClass);

                for (var idx = 0; idx <= daysToHighlight; idx++) {
                    var d = startDate.clone().add(idx).days();
                    var dateCellClass = '.dp' + d.getTime();

                    $this.find(dateCellClass + ':not(.' + renderer.otherMonthClass +')')
                        .addClass(renderer.selectedClass);
                }
            }
        },

        //NOTE: Should use the main jquery.datepick.ext.js here, but leaving a copy of this function here since I'm not using the rest.

        /* Add a callback when hovering over dates.
         Usage: onShow: $.datepick.hoverCallback(handleHover).
         @param  onHover  (function) the callback when hovering,
         it receives the current date and a flag indicating selectability
         as parameters on entry, and no parameters on exit,
         this refers to the target input or division */
        hoverCallback: function (onHover) {
            return function (picker, inst) {
                if ($.isFunction(onHover)) {
                    var target = this;
                    picker.find(inst.options.renderer.daySelector + ' a, ' +
                            inst.options.renderer.daySelector + ' span').
                        hover(function () {
                            onHover.apply(target, [$(target).datepick('retrieveDate', this),
                                this.nodeName.toLowerCase() == 'a']);
                        },
                        function () {
                            onHover.apply(target, []);
                        });
                }
            };
        }

    });

})(jQuery);
