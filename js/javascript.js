/*
start app
- create tables
- read file for synchronize
    if modification > then db.lastExportDate =  read data from file

- export data
    lastExportDate is set in db by date of saved file


lastSyncDate
    - when read xml si proceed lastSyncDate is set
    - on every focus a input, is get lastSyncDate from db. Value si put to memory inputValue
    - on every change is check if lastSyncDate > 30, then alert is shown and value put back from inputValue
 */

var lastRowID = 0;
var sheetCurrent = 0;
var rowUpdatedID = 0;
var categorySelectPrev = "Instructions";
var firstInsert = false;
var inputValue;
var focusStop = false;
//var defaultCodeOptionsHtml = "<option>4006 &quot;Auto Expenses&quot;</option> <option>4007 &quot;Food/Sundries&quot;</option> <option>4008 &quot;Home Maintenance&quot;</option> <option>4009 &quot;Insurance&quot;</option> <option>4010 &quot;Medical&quot;</option> <option>4011 &quot;Housing&quot;</option> <option>4012 &quot;Telephone&quot;</option> <option>4013 &quot;Utilities&quot;</option> <option>4014 &quot;Open&quot;</option> <option>4015 &quot;Open&quot;</option> <option>4016 &quot;Unident ified Cash w/d&quot;</option> <option>4017 &quot;Open&quot;</option> <option>4018 &quot;Open&quot;</option> <option>4019 &quot;Oenn</option> <option>4020 &quot;Open&quot;</option> <option>4021 &quot;Open&quot;</option> <option>4517 &quot;Child#1-A&quot;</option> <option>4517 &quot;Child#2-B&quot;</option> <option>4517 &quot;Child#3-C&quot;</option> <option>4517 &quot;Child#4-D&quot;</option> <option>4517 &quot;Child#5-E&quot;</option> <option>4518 &quot;for Primary Wage Earner #1&quot;</option> <option>4519 &quot;for Primary Wage Earner #2&quot;</option> <option>4520 &quot;Pet#1-A&quot;</option> <option>4520 &quot;Pet#2-B&quot;</option> <option>4521 &quot;Open&quot;</option> <option>5023 &quot;Medical Debt / Fees / Charges&quot;</option> <option>5024 &quot;Loans &amp; Notes Payable&quot;</option> <option>5025 &quot;Tax Debt I Estimated Tax&quot;</option> <option>5026 &quot;Open&quot;</option> <option>6028 &quot;Donations/Gifts&quot;</option> <option>6029 &quot;Entertainment&quot;</option> <option>6032 &quot;Savings&quot;</option> <option>6033 &quot;Vacations&quot;</option>";
var defaultCodeOptionsHtml = "<option>Auto Expenses</option> <option>Food/Sundries</option><option>HomeMaintenance</option><option>Insurance</option><option>Medical</option><option>Housing</option><option>Telephone</option><option>Utilities</option><option>DependentExpenses</option><option>PersonalExpenses</option><option>Spouse/PartnerExpenses</option><option>PetExpenses</option><option>CreditCardPayments</option><option>Loans&NotesPayable</option><option>Taxes</option><option>Donations/Gifts</option><option>Entertainment</option><option>Investments</option><option>Retirement</option><option>Savings</option><option>Vacations</option><option>Open</option>";
var defaultHowPaidOptionsHtml = "<option>CASH</option> <option>BK#0001</option> <option>BK#0002</option> <option>BK#0003</option> <option>BK#0004</option> <option>BK#0005</option> <option>BK#0006</option> <option>BK#0007</option> <option>BK#0008</option> <option>BK#0009</option> <option>BK#0010</option> <option>BK#9999</option> <option>CC#0001</option> <option>CC#0002</option> <option>CC#0003</option> <option>CC#0004</option> <option>CC#0005</option> <option>CC#0006</option> <option>CC#0007</option> <option>CC#0008</option> <option>CC#0009</option> <option>CC#9999</option> <option>LOC#001</option> <option>LOC#002</option> <option>LOC#003</option>";
var dbHowPaidOptionsHtml = defaultHowPaidOptionsHtml;
var testWritelData = '<data><meta><category><option>4517 &quot;Child#1-A&quot;</option><option>4007 &quot;Food/Sundries&quot;</option><option>4008 &quot;Home Maintenance&quot;</option><option>4009 &quot;Insurance&quot;</option><option>4010 &quot;Medical&quot;</option><option>4011 &quot;Housing&quot;</option><option>4012 &quot;Telephone&quot;</option><option>4013 &quot;Utilities&quot;</option><option>4014 &quot;Open&quot;</option><option>4015 &quot;Open&quot;</option><option>4016 &quot;Unident ified Cash w/d&quot;</option><option>4017 &quot;Open&quot;</option><option>4018 &quot;Open&quot;</option><option>4019 &quot;Oenn</option><option>4020 &quot;Open&quot;</option><option>4021 &quot;Open&quot;</option><option>4517 &quot;Child#1-A&quot;</option><option>4517 &quot;Child#2-B&quot;</option><option>4517 &quot;Child#3-C&quot;</option><option>4517 &quot;Child#4-D&quot;</option><option>4517 &quot;Child#5-E&quot;</option><option>4518 &quot;for Primary Wage Earner #1&quot;</option><option>4519 &quot;for Primary Wage Earner #2&quot;</option><option>4520 &quot;Pet#1-A&quot;</option><option>4520 &quot;Pet#2-B&quot;</option><option>4521 &quot;Open&quot;</option><option>5023 &quot;Medical Debt / Fees / Charges&quot;</option><option>5024 &quot;Loans &amp; Notes Payable&quot;</option><option>5025 &quot;Tax Debt I Estimated Tax&quot;</option><option>5026 &quot;Open&quot;</option><option>6028 &quot;Donations/Gifts&quot;</option><option>6029 &quot;Entertainment&quot;</option><option>6032 &quot;Savings&quot;</option><option>6033 &quot;Vacations&quot;</option><option>4006 &quot;Auto Expenses&quot;</option><option>4007 &quot;Food/Sundries&quot;</option><option>4008 &quot;Home Maintenance&quot;</option><option>4009 &quot;Insurance&quot;</option><option>4010 &quot;Medical&quot;</option><option>4011 &quot;Housing&quot;</option><option>4012 &quot;Telephone&quot;</option><option>4013 &quot;Utilities&quot;</option><option>4014 &quot;Open&quot;</option><option>4015 &quot;Open&quot;</option><option>4016 &quot;Unident ified Cash w/d&quot;</option><option>4017 &quot;Open&quot;</option><option>4018 &quot;Open&quot;</option><option>4019 &quot;Oenn</option><option>4020 &quot;Open&quot;</option><option>4021 &quot;Open&quot;</option><option>4517 &quot;Child#1-A&quot;</option><option>4517 &quot;Child#2-B&quot;</option><option>4517 &quot;Child#3-C&quot;</option><option>4517 &quot;Child#4-D&quot;</option><option>4517 &quot;Child#5-E&quot;</option><option>4518 &quot;for Primary Wage Earner #1&quot;</option><option>4519 &quot;for Primary Wage Earner #2&quot;</option><option>4520 &quot;Pet#1-A&quot;</option><option>4520 &quot;Pet#2-B&quot;</option><option>4521 &quot;Open&quot;</option><option>5023 &quot;Medical Debt / Fees / Charges&quot;</option><option>5024 &quot;Loans &amp; Notes Payable&quot;</option><option>5025 &quot;Tax Debt I Estimated Tax&quot;</option><option>5026 &quot;Open&quot;</option><option>6028 &quot;Donations/Gifts&quot;</option><option>6029 &quot;Entertainment&quot;</option><option>6032 &quot;Savings&quot;</option><option>6033 &quot;Vacations&quot;</option></category><howPaid><option>testHowPaid</option><option>CASH</option> <option>BK#0001</option> <option>BK#0002</option> <option>BK#0003</option> <option>BK#0004</option> <option>BK#0005</option> <option>BK#0006</option> <option>BK#0007</option> <option>BK#0008</option> <option>BK#0009</option> <option>BK#0010</option> <option>BK#9999</option> <option>CC#0001</option> <option>CC#0002</option> <option>CC#0003</option> <option>CC#0004</option> <option>CC#0005</option> <option>CC#0006</option> <option>CC#0007</option> <option>CC#0008</option> <option>CC#0009</option> <option>CC#9999</option> <option>LOC#001</option> <option>LOC#002</option> <option>LOC#003</option></howPaid><code><option>123 &quot;muj test&quot;</option><option>4006 &quot;Auto Expenses&quot;</option> <option>4007 &quot;Food/Sundries&quot;</option> <option>4008 &quot;Home Maintenance&quot;</option> <option>4009 &quot;Insurance&quot;</option> <option>4010 &quot;Medical&quot;</option> <option>4011 &quot;Housing&quot;</option> <option>4012 &quot;Telephone&quot;</option> <option>4013 &quot;Utilities&quot;</option> <option>4014 &quot;Open&quot;</option> <option>4015 &quot;Open&quot;</option> <option>4016 &quot;Unident ified Cash w/d&quot;</option> <option>4017 &quot;Open&quot;</option> <option>4018 &quot;Open&quot;</option> <option>4019 &quot;Oenn</option> <option>4020 &quot;Open&quot;</option> <option>4021 &quot;Open&quot;</option> <option>4517 &quot;Child#1-A&quot;</option> <option>4517 &quot;Child#2-B&quot;</option> <option>4517 &quot;Child#3-C&quot;</option> <option>4517 &quot;Child#4-D&quot;</option> <option>4517 &quot;Child#5-E&quot;</option> <option>4518 &quot;for Primary Wage Earner #1&quot;</option> <option>4519 &quot;for Primary Wage Earner #2&quot;</option> <option>4520 &quot;Pet#1-A&quot;</option> <option>4520 &quot;Pet#2-B&quot;</option> <option>4521 &quot;Open&quot;</option> <option>5023 &quot;Medical Debt / Fees / Charges&quot;</option> <option>5024 &quot;Loans &amp; Notes Payable&quot;</option> <option>5025 &quot;Tax Debt I Estimated Tax&quot;</option> <option>5026 &quot;Open&quot;</option> <option>6028 &quot;Donations/Gifts&quot;</option> <option>6029 &quot;Entertainment&quot;</option> <option>6032 &quot;Savings&quot;</option> <option>6033 &quot;Vacations&quot;</option></code></meta><sheet><header><shid>1</shid><category>t1</category><planSpend>100.00</planSpend><code>4007 "Food/Sundries"</code></header><tableData><row><rowID>1</rowID><date></date><paid>BK#0001</paid><desc>aa</desc><ref>12</ref><payment>12.00</payment><available>-12.00</available></row></tableData></sheet><sheet><header><shid>2</shid><category>t2</category><planSpend>0.00</planSpend><code>4517 "Child#1-A"</code></header><tableData><row><rowID>1</rowID><date></date><paid>BK#0002</paid><desc>neci</desc><ref></ref><payment></payment><available></available></row></tableData></sheet></data>';

var currentDate = new Date();
logging("currentDate:" + currentDate,1);
var syncDate;
syncDate = "";

var pieData=[];

function onDeviceReady()
{
    //alert("onDeviceReady");
    init();
}

function onDeviceReadyDelay()
{
    //alert("onDeviceReadyDelay");
    init();
}

function init()
{


    if(!pgReady)
    {
        pgReady = true;
    } else
    return;


    // by supported aceleration, prepare classes and view
    transitionInit();

    // set clicks function on buttons, touch or click
    clickInit();



    db.init(); // inside is fileInit();
    //pieShow();
}
function pieShow()
{
    db.pieDataGetShid(pieRender);
    //pieRender();
}

function pieHide()
{
    $("div.sheets").css("display","block");
    $("div.topMenu").css("display","block");
    $("div.piePage").css("display","none");
}


function pieRender()
{
    $("div.sheets").css("display","none");
    $("div.topMenu").css("display","none");
    $("div.piePage").css("display","block");
    $(".piePage h1").html($("#code option:selected").text() + " summary");


    var dimension = $(document).width()>$(document).height()?$(document).height():$(document).width();
    $("#chartdiv").css("width",dimension /2 +"px");
    $("#chartdiv").css("height",dimension /2 +"px");


    var s1 = [['Sony',7], ['Samsumg',13.3], ['LG',14.7], ['Vizio',5.2], ['Insignia', 1.2]];
    s1 = pieData;
    console.log(pieData);


    var plot8 = $.jqplot('chartdiv', [s1], {
        grid: {
            drawBorder: false,
            drawGridlines: false,
            background: '#ffffff',
            shadow:false
        },
        axesDefaults: {

        },
        seriesDefaults:{
            renderer:$.jqplot.PieRenderer,
            rendererOptions: {
                showDataLabels: false
            }
        },
        legend: {
            show: true,
            rendererOptions: {
                numberColumns: 1
            },
            location: 'e'
        }
    });

    $("#chartdivTable table").css("width",dimension*0.8);
    $("#chartdivTable tbody").empty();
    var htmladd = "";
    for(var i=0;i<pieData.length;i++)
    {
        htmladd += "<tr><td>"+pieData[i][0]+"</td><td>"+numDecimalCorrection(pieData[i][1],2)+"</td><tr>";
    }
    $("#chartdivTable tbody").append(htmladd);




    //$("table.jqplot-table-legend").css("width","200px");


}

function transitionInit()
{
    if(fileSupportOff)
    {
        $("#buttonSave").css("visibility","hidden");
    }
}

function clickInit()
{


    $(document).on('change', '.content input, .content select', function() {
        if(dbUpdater2(this))
        {
            addRowCheck(this);
            //focusSetNext(this); // is set on keypress event
        }
    });

    $(document).on('click', '.instructions input', function() {
        var el = $(this);
        setTimeout(function(){
            startTable(el);
        },50)

    });

    // read date of sync from db.
    //  its because is asynchronous. So user in meanwhile user can modified and after enter it will check if is sync < 30 days
    $(document).on("click","input, select",function() {
        if ($(this).is(":focus")) {
            db.readLastSync();
            inputValue = $(this).val();
        }
    });


    $(function() {
        FastClick.attach(document.body);
    });


    // focus next field in table
    $(document).on("keypress",".content input",function(e) {
        if (e.which == 13) {

            if($(this).closest('span').hasClass("payment"))
            {
                // last field
            } else if($(this).closest('span').hasClass("description"))
            {
                var elNext = $(this).closest('span').next().find('select');
                $(elNext).focus();
                $(elNext).click();
            } else
            {
                var elNext = $(this).closest('span').next().find('input');
                $(elNext).focus();
                $(elNext).click();
            }
        }
    });



// ---------- right button
    $('#categorySelectNext').on('click', function() {
        if($('#categorySelect option:selected').next().val()==null) return;

        if($('#categorySelect option:selected').next().val() == "New page")
        {
            return;
        }
        $("#categorySelect > option:selected")
            .prop("selected", false)
            .next()
            .prop("selected", true);
        db.loadSheet();memPrev();
    });
// ---------- left button
    $('#categorySelectPrev').on('click', function() {
        if($('#categorySelect option:selected').prev().val() == "New page")
        {
            return;
        }
        $("#categorySelect > option:selected")
            .prop("selected", false)
            .prev()
            .prop("selected", true);
        db.loadSheet();memPrev();
    });

}

function newWTable()
{
    logging("newWTable",1);

    // hide instruction if you tap new Page on that
    // this code is in db.loadSheet
    if(categorySelectPrev=="Instructions")
    {
        showInstructions(false);
        $("body").css("display","block");
    }
    //newWTableRender();
    db.CreateNextTable();
    //currentWtable = lastWtable;

    $("#category").val("");
    //$("#code").val('4011 "Housing"');
    $("#code").val($("#code option:first").val());
    $("#planSpend").val("0.00");
    $("ul.content").empty();
    lastRowID  =0;
    addRow();
}

function newWTableRender()
{
    var newWtable = $("#first").html();
    newWtable = ('<div id="'+currentWtable+'" style="disply:block">'+newWtable+'</div>');
    $(".main").append(newWtable);
}

function recalculateBalance()
{
    var total = document.getElementById("planSpend").value;
    var underValue = false;
    $(".content li").each(function(){
        var payment = $(this).find(".payment input").val();
        if(payment > 0)
        {

        } else
        {
            $(this).find(".payment input").val(0);
            payment = 0;
        }
        total = parseFloat(Math.round((total-payment) * 100) / 100).toFixed(2);
        var aviableAmountEl = $(this).find(".last input");
        $(aviableAmountEl).val(total);
        $(this).find(".last input").val(total);
        if(total>=0)
        {
            $(aviableAmountEl).css("color","black");
        } else
        {
            $(aviableAmountEl).css("color","red");
            underValue= true;
        }
//        dbUpdater2($(this).find(".payment input"));
    });
    if(underValue) alert("Available balance is under $0");
    db.recalculateBalance();


}

function priceFormatCheck(el)
{
    value = el.value;
    var proceedUpdate = true;

    // is it positive number?
    if(isNaN(Number(value)) || Number(value)<0)
    {
        alert("This value must be positive real number");
        //$("#planSpend").val("0");
        $(el).val("0");
        proceedUpdate = false;
    }

    // has this number ".00" ?
    var elSlinc = value.split(".");
    if(elSlinc.length == 1 && proceedUpdate)
    {
        value = value + ".00";
        el.value = value;
    }

    recalculateBalance();
    db.headerUpdate();

}

function dateFormatIn(el)
{
    if (typeof datePicker === 'undefined') {
        return;
    }

    var options = {
        date: new Date(),
        mode: 'date'
    };

    el.blur();
    datePicker.show(options, function(date){
        if(date)
        {
            // fill date in input
            var newDate = new Date(date);
            el.value = (Number(newDate.getMonth()) + 1) + "/" + newDate.getDate();

            // happend when is cancel button press
            if(date==null) return;
            alert(date);

            // focus next field
            var elNext = $(el).closest('span').next().find('input');
            $(elNext).focus();
            $(elNext).click();
        }
    });

}

function dateFormatCheck(el)
{

    value = el.value;
    if(value.length>0)
    {
        elSlinc = value.split("/");
        if(elSlinc.length < 2 || elSlinc.length > 3)
        {
            alert("Date format must be: 'M/D' or M/D/YY");
            $(el).val("");
            $(el).focus();
            return;
        }
    }
    $(el).closest('span').next().find('input').focus();
}

function addRowCheck(el)
{
    var thisRowID = $(el).parent().parent().attr("data-id");
    if(thisRowID == lastRowID)
    {
        addRow();
    }

}

function addRow()
{
    logging("addRow",1);
    lastRowID ++;

    $("ul.content").append('<li data-id="'+lastRowID+'"> <span class="dater"><input onchange="dateFormatCheck(this)" onfocus="dateFormatIn(this)"></span><span class="description"><input></span><span class="paid"><select>'+dbHowPaidOptionsHtml+'</select></span><span class="checkRef"><input></span> <span class="payment"><input onchange="priceFormatCheck(this)"></span> <span class="last"><input readonly></span> </li>');

    //date picker (without dateFormatCheck()) dont work on Android
    //$("ul.content").append('<li data-id="'+lastRowID+'"> <span class="dater"><input type="date" required="required"></span> <span  class="paid"><select>'+dbHowPaidOptionsHtml+'</select></span> <span class="description"><input></span> <span class="checkRef"><input></span> <span class="payment"><input onchange="priceFormatCheck(this)"></span> <span class="last"><input readonly></span> </li>');
}

function updateHeader()
{
    var proceedUpdate = true;
    var category = $("#category").val();
    var code = $("#code option:selected").text();
    var planSpend = $("#planSpend").val();

    // fields validation
    if(isNaN(Number(planSpend)))
    {
        alert("Plan to spend must be positive real number");
        $("#planSpend").val("0");
        proceedUpdate = false;
    }

    if(proceedUpdate) dbUpdateHeader();
}


function categorySelectonchange()
{
    if($("#categorySelect").val()=="New page")
    {
        newWTable();
    }
        else
    {
        db.loadSheet();db.setOpenedSheet();memPrev();
    }

}
function categorySelectUpdate()
{
    $( "#categorySelect option:selected" ).text($('#category').val());
}

function buttonDelete()
{
    if($("#categorySelect option:selected").val()=="Instructions")
        return;

    var r = confirm("Do you want to delete this page and all data?");
    if (r == true) {
        db.deleteShid(deleteAfterSelectCategory);
    } else {
        return;
    }
}

function deleteAfterSelectCategory()
{
    $("#categorySelect option[value="+shidCurrentGet()+"]").remove();
    if($('#categorySelect > option').length<3){
        //$("categorySelect").prop('selectedIndex', 1);
        $('#categorySelect :nth-child(1)').prop('selected', true);

    } else
    {
        $('#categorySelect :nth-child(2)').prop('selected', true);
    }

    db.loadSheet();memPrev();
}

function buttonSave()
{
    //alert("I will preform save");
    manualySave= true;
    generateXML("write");
}

function shidCurrentGet()
{
    return $("#categorySelect option:selected").val();
}

function dbUpdater2(el)
{
    var run = true;
    if(!lastSyncOK())
    {
        $(el).val(inputValue);
        run = false;
    } else
    {
        rowUpdatedID = $(el).parent().parent().attr("data-id");
        db.rowUpdateInsert();
        //db.transaction(dbUpdateQ, errorCB);
    }
    return run;
}

function startTable(el)
{
    $(el).prop('checked', false);
    var code = $(el).next().next().html();
    //$(".instructions div.pickUp").html("");
    showInstructions(false);

    newWTable();

    $("#code option:contains(" + code + ")").attr('selected', 'selected');
    //$("#code option:selected").text(code);

    //db.transaction(dbUpdateQ, errorCB);
}

function showInstructions(yesnNo)
{
    logging("showInstructions: "+yesnNo,1);
    if(yesnNo)
    {
        // show instructions
        //$("div.topMenu").css("display","none");
        $("div.sheets").css("display","none");
        $("div.instructions").css("display","block");
    } else
    {
        $("div.topMenu").css("display","block");
        $("div.sheets").css("display","block");
        $("div.instructions").css("display","none");
    }

}
function showInstructionsCodes()  // zruseno
{
    $("div.instruction").append("<div class='checkboxes'>");
    $("#code option").each(function()
    {
        $(".instructions div.pickUp").append('<input type="checkbox" value="'+$(this).text()+'"><span>'+$(this).text()+'</span><br>');

    });
}

function codesSetDefaults()
{
    var i =0;
    $("#code").append(defaultCodeOptionsHtml);

    $("div.instruction").append("<div class='checkboxes'>");
    $("#code option").each(function()
    {
        $(".instructions div.pickUp").append('<input id="instCheck'+i+'" type="checkbox" value="'+$(this).text()+'"><label class="checkboxFive" for="instCheck'+i+'"></label><label for="instCheck'+i+'">'+$(this).text()+'</label><br>');
        i++;
    });
}

function memPrev()
{
    categorySelectPrev = $("#categorySelect option:selected").val();
}

function lastSyncOK()
{
    var state = true;
    console.log("last read:" + lastSyncDate);
    if(lastSyncDate!=null)
    {
        currentDate = new Date();
        var ar = lastSyncDate.split("-");
        d_lastExportDate = new Date(ar[0],ar[1]-1,ar[2],ar[3],ar[4]);
        var oneDay = 24*60*60*1000;
        var diffDays = Math.round(Math.abs((currentDate.getTime() - d_lastExportDate.getTime())/(oneDay)));
        //diffDays = 50;
        if(diffDays>45)
        {
            alert('This app stops after 45 days. You cannot make any further changes. Please answer some questions about how the app worked for you.');
            setTimeout(function(){
                //http://community.phonegap.com/nitobi/topics/open_external_links_in_system_browser_phonegap_build_3_1_iphone_android_windows
                window.open("http://www.google.com", '_system', 'location=no')
            }, 300)
            state = false;
        }
    }


    firstInsert = true;
    return state;

}

function focusSetNext(el)
{
    // if you in table, set focus on next field
    // $(el).parent().siblings('div.bottom').find("input.post").focus();
}



//-------------------------------------------------------------------
// level: 1=INFO, 2=WARNING, 3=ERROR
function logging(str, level) {
    if (level == 1) console.log("INFO:" + str);
    if (level == 2) console.log("WARN:" + str);
    if (level == 3) alert("ERROR:" + str);
    if(loggingAlert) alert(str);

    var elLog = $("#log");
    if(elLog.length>0)
    {
        var elTextarea = $("#log").find("textarea");
        var text= $(elTextarea).val();
        text += str + "\n";
        $(elTextarea).val(text);
        $(elTextarea).scrollTop($(elTextarea)[0].scrollHeight);
    }
};


function StringtoXML(text){
    if (window.ActiveXObject){
        var doc=new ActiveXObject('Microsoft.XMLDOM');
        doc.async='false';
        doc.loadXML(text);
    } else {
        var parser=new DOMParser();
        var doc=parser.parseFromString(text,'text/xml');
    }
    return doc;
}

// ---- menu button
function enableMenuButton()
{
    document.addEventListener("menubutton", menuButton, true);
}

function menuButton() {
    $("#log").toggle();
}

// it works just for 2 decimals now
function numDecimalCorrection(numr,decimals)
{
    var ar = numr.toString().split(".");
    if(ar.length==1) return numr + ".00";
    numr = numr + "00";
    return numr.substring(0,numr.indexOf(".")+3);
}