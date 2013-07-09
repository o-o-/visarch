 /*
 * AutoSuggest
 * Copyright 2009-2010 Drew Wilson
 * www.drewwilson.com
 * code.drewwilson.com/entry/autosuggest-jquery-plugin
 *
 * Version 1.4   -   Updated: Mar. 23, 2010
 *
 * This Plug-In will auto-complete or auto-suggest completed search queries
 * for you as you type. You can add multiple selections and remove them on
 * the fly. It supports keybord navigation (UP + DOWN + RETURN), as well
 * as multiple AutoSuggest fields on the same page.
 *
 * Inspied by the Autocomplete plugin by: J�rn Zaefferer
 * and the Facelist plugin by: Ian Tearle (iantearle.com)
 *
 * This AutoSuggest jQuery plug-in is dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function(c){c.fn.autoSuggest=function(n,E){var a=c.extend({asHtmlID:!1,startText:"Enter Name Here",emptyText:"No Results Found",preFill:{},limitText:"No More Selections Are Allowed",selectedItemProp:"value",selectedValuesProp:"value",searchObjProps:"value",queryParam:"q",retrieveLimit:!1,extraParams:"",matchCase:!1,minChars:1,keyDelay:400,resultsHighlight:!0,neverSubmit:!1,selectionLimit:!1,showResultList:!0,start:function(){},selectionClick:function(){},selectionAdded:function(){},selectionRemoved:function(a){a.remove()},
    formatList:!1,beforeRetrieve:function(a){return a},retrieveComplete:function(a){return a},resultClick:function(){},resultsComplete:function(){}},E),w="object",v=0;if("string"==typeof n)var w="string",F=n;else{var G=n;for(k in n)n.hasOwnProperty(k)&&v++}if("object"==w&&0<v||"string"==w)return this.each(function(b){function n(){if(46==lastKeyPressCode||8<lastKeyPressCode&&32>lastKeyPressCode)return g.hide();var f=j.val().replace(/[\\]+|[\/]+/g,"");if(f!=x)if(x=f,f.length>=a.minChars)if(h.addClass("loading"),
    "string"==w){var b="";a.retrieveLimit&&(b="&limit="+encodeURIComponent(a.retrieveLimit));a.beforeRetrieve&&(f=a.beforeRetrieve.call(this,f));c.getJSON(F+"?"+a.queryParam+"="+encodeURIComponent(f)+b+a.extraParams,function(c){v=0;c=a.retrieveComplete.call(this,c);for(k in c)c.hasOwnProperty(k)&&v++;B(c,f)})}else a.beforeRetrieve&&(f=a.beforeRetrieve.call(this,f)),B(G,f);else h.removeClass("loading"),g.hide()}function B(f,b){a.matchCase||(b=b.toLowerCase());var A=0;g.html(t.html("")).hide();for(var e=
    0;e<v;e++){var m=e;C++;var d=!1;if("value"==a.searchObjProps)var q=f[m].value;else for(var q="",n=a.searchObjProps.split(","),p=0;p<n.length;p++)var r=c.trim(n[p]),q=q+f[m][r]+" ";q&&(a.matchCase||(q=q.toLowerCase()),-1!=q.search(b)&&-1==l.val().search(f[m][a.selectedValuesProp]+",")&&(d=!0));if(d&&(d=c('<li class="as-result-item" id="as-result-item-'+m+'"></li>').click(function(){var f=c(this).data("data"),b=f.num;if(0>=c("#as-selection-"+b,h).length&&!y){var d=f.attributes;j.val("").focus();x="";
    z(d,b);a.resultClick.call(this,f);g.hide()}y=!1}).mousedown(function(){s=!1}).mouseover(function(){c("li",t).removeClass("active");c(this).addClass("active")}).data("data",{attributes:f[m],num:C}),m=c.extend({},f[m]),q=a.matchCase?RegExp("(?![^&;]+;)(?!<[^<>]*)("+b+")(?![^<>]*>)(?![^&;]+;)","g"):RegExp("(?![^&;]+;)(?!<[^<>]*)("+b+")(?![^<>]*>)(?![^&;]+;)","gi"),a.resultsHighlight&&(m[a.selectedItemProp]=m[a.selectedItemProp].replace(q,"<em>$1</em>")),d=a.formatList?a.formatList.call(this,m,d):d.html(m[a.selectedItemProp]),
    t.append(d),delete m,A++,a.retrieveLimit&&a.retrieveLimit==A))break}h.removeClass("loading");0>=A&&t.html('<li class="as-message">'+a.emptyText+"</li>");t.css("width",h.outerWidth());g.show();a.resultsComplete.call(this)}function z(f,b){l.val(l.val()+f[a.selectedValuesProp]+",");var d=c('<li class="as-selection-item" id="as-selection-'+b+'"></li>').click(function(){a.selectionClick.call(this,c(this));h.children().removeClass("selected");c(this).addClass("selected")}).mousedown(function(){s=!1}),g=
    c('<a class="as-close">&times;</a>').click(function(){l.val(l.val().replace(f[a.selectedValuesProp]+",",""));a.selectionRemoved.call(this,d);s=!0;j.focus();return!1});p.before(d.html(f[a.selectedItemProp]).prepend(g));a.selectionAdded.call(this,p.prev())}function D(a){if(0<c(":visible",g).length){var b=c("li",g),d="down"==a?b.eq(0):b.filter(":last"),e=c("li.active:first",g);0<e.length&&(d="down"==a?e.next():e.prev());b.removeClass("active");d.addClass("active")}}if(a.asHtmlID)d=b=a.asHtmlID;else{b=
    b+""+Math.floor(100*Math.random());var d="as-input-"+b}a.start.call(this);var j=c(this);j.attr("autocomplete","off").addClass("as-input").attr("id",d).val(a.startText);var s=!1;j.wrap('<ul class="as-selections" id="as-selections-'+b+'"></ul>').wrap('<li class="as-original" id="as-original-'+b+'"></li>');var h=c("#as-selections-"+b),p=c("#as-original-"+b),g=c('<div class="as-results" id="as-results-'+b+'"></div>').hide(),t=c('<ul class="as-list"></ul>'),l=c('<input type="hidden" class="as-values" name="as_values_'+
    b+'" id="as-values-'+b+'" />'),e="";if("string"==typeof a.preFill){d=a.preFill.split(",");for(b=0;b<d.length;b++){var r={};r[a.selectedValuesProp]=d[b];""!=d[b]&&z(r,"000"+b)}e=a.preFill}else{e="";d=0;for(k in a.preFill)a.preFill.hasOwnProperty(k)&&d++;if(0<d)for(b=0;b<d;b++)r=a.preFill[b][a.selectedValuesProp],void 0==r&&(r=""),e=e+r+",",""!=r&&z(a.preFill[b],"000"+b)}""!=e&&(j.val(""),","!=e.substring(e.length-1)&&(e+=","),l.val(","+e),c("li.as-selection-item",h).addClass("blur").removeClass("selected"));
    j.after(l);h.click(function(){s=!0;j.focus()}).mousedown(function(){s=!1}).after(g);var u=null,x="",y=!1;j.focus(function(){c(this).val()==a.startText&&""==l.val()?c(this).val(""):s&&(c("li.as-selection-item",h).removeClass("blur"),""!=c(this).val()&&(t.css("width",h.outerWidth()),g.show()));return s=!0}).blur(function(){""==c(this).val()&&""==l.val()&&""==e?c(this).val(a.startText):s&&(c("li.as-selection-item",h).addClass("blur").removeClass("selected"),g.hide())}).keydown(function(b){lastKeyPressCode=
        b.keyCode;first_focus=!1;switch(b.keyCode){case 38:b.preventDefault();D("up");break;case 40:b.preventDefault();D("down");break;case 8:""==j.val()&&(b=l.val().split(","),b=b[b.length-2],h.children().not(p.prev()).removeClass("selected"),p.prev().hasClass("selected")?(l.val(l.val().replace(b+",","")),a.selectionRemoved.call(this,p.prev())):(a.selectionClick.call(this,p.prev()),p.prev().addClass("selected")));1==j.val().length&&(g.hide(),x="");0<c(":visible",g).length&&(u&&clearTimeout(u),u=setTimeout(function(){n()},
        a.keyDelay));break;case 9:case 188:y=!0;var d=j.val().replace(/(,)/g,"");if(""!=d&&0>l.val().search(d+",")&&d.length>=a.minChars){b.preventDefault();var e={};e[a.selectedItemProp]=d;e[a.selectedValuesProp]=d;d=c("li",h).length;z(e,"00"+(d+1));j.val("")}case 13:y=!1;e=c("li.active:first",g);0<e.length&&(e.click(),g.hide());(a.neverSubmit||0<e.length)&&b.preventDefault();break;default:a.showResultList&&(a.selectionLimit&&c("li.as-selection-item",h).length>=a.selectionLimit?(t.html('<li class="as-message">'+
        a.limitText+"</li>"),g.show()):(u&&clearTimeout(u),u=setTimeout(function(){n()},a.keyDelay)))}});var C=0})}})(jQuery);