var displayHelper = {};

/**
 * purpose: initialize the poll
 */
displayHelper.initializePoll = function(){

	// bind events
	$('#addOption').click(function(){
		displayHelper.addOptionToList();
	});

	$('#addMultiOptions').click(function(){
		displayHelper.addMultiOptionsToList();
	});

	$('.startPoll').click(function(){
		displayHelper.startPoll();
	});

	$('.stopPoll').click(function(){
		displayHelper.stopPoll();
	});

	$('.changePoll').click(function(){
		displayHelper.stopPoll();
	});

	// add an option to the list when the user selects the enter key
	$("#optionText").keypress(function (e) {
         if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
         	// take an action
			displayHelper.addOptionToList();
         }
     });

     // hide the poll results container because there are not any results yet
     $('#pollResults').hide();
};


/**
 * purpose: add an option to the option list using the string in
 * the input field: #optionText
 */
displayHelper.addOptionToList = function(){
	var option = $('#optionText').val();
	displayHelper._addOption(option);
};

/**
 * purpose: add multiple options to the option list using the strings in
 * the textarea: #multiOptionText
 */
displayHelper.addMultiOptionsToList = function(){
	// split the options from the textarea
	var options = $('#multiOptionText').val();
	var optionArray = options.split('\n');

	// add each option
	$.each(optionArray, function(){
		displayHelper._addOption(this);
	});

	// clear the textarea
	$('#multiOptionText').val('');

};

displayHelper.addBySelectOptionsToList = function(list_ID,type){
	$('#optionsList').empty();
	var layerTVList = [['負責人的資歷','負責人過去作品銷售紀錄','負責人過去作品參展與得獎數','負責人曾經執行的最大片預算'],
	['負責人預算控管能力','公司營運及財務狀況'],
	['製作團隊的資歷','製作團隊過去作品銷售紀錄','製作團隊過去作品得獎數'],
	['過去公司投融資之成效','過去公司獎補助之成效'],
	['編劇的資歷、學歷','編劇過去作品平均收視率','編劇過去作品得獎數'],
	['製作人的資歷、學歷','製作人專案資源整合能力','製作人過去作品平均收視率','製作人過去作品得獎數'],
	['導演的資歷、學歷','導演過去作品平均收視率','導演過去作品得獎數'],
	['演員的資歷','演員過去作品平均收視率','演員過去得獎數','演員媒體曝光度(包含搜尋引擎及社群平台搜尋次數、粉絲專頁人數)','演員的知名度'],
	['製作團隊合作次數','製作團隊平均收視率','新銳成員潛力'],
	['市場的流行趨勢變化與需求','題材類型(潮流，與當時社會氛圍接軌程度)','題材的創新程度'],
	['劇本的行銷國際程度','同類型電視劇過去平均收視率','同類型電視劇過去得獎數','相關文學改編之IP作品'],
	['播放頻道','各頻道收視率'],
	['專案預算規模','預算執行狀況及合理性'],
	['製作期間是否已有多元管道之資金支持','自有資金投入程度'],
	['製作團隊執行效率','製作團隊向心力','製作經費支用管控能力','製作時程管理'],
	['已完成之委製製作合約','已完成之合作意向書'],
	['影片版權播放契約','周邊商品契約'],
	['電視劇行銷企劃能力','已完成之行銷合約','合作行銷廠商質量(過去行銷專案的實績)'],
	['衍生之周邊商品收入','潛在海內外版權收入','置入性行銷收入、冠名、贊助'],
	['電視台或新媒體預購版權家數','預售版權收入(電視台承諾購買版權)'],
	['海外市場銷售限制','預估獲利收益之情形'],
	['潛在合作行銷廠商(媒體、企業無形資產、品牌效益、贊助等)','傳統媒體(如報紙、雜誌、廣播)的擴散效果','新媒體(如OTT、Fox、Netflix平台)的擴散效果','社群媒體(如Facebook, PTT)的討論程度','通路(無線電視、頻道商)合作的擴散效果'],
	['負責人的經驗水準','管理能力'],
	['製作團隊組合','資金籌措能力'],
	['編劇能力','製作人能力','導演能力','演員(男/女主角)能力及受歡迎程度','製作團隊默契'],
	['題材的潛力','劇本流行性'],
	['電視台播放確認','預算之合理性','資金到位情況','製作管理能力','契約確認'],
	['銷售契約','行銷能力'],
	['收入管道','預售情形','投資報酬率','擴散效果'],
	['負責人的能力','企業能力'],
	['製作能力','作品內容核心元素','完工能力'],
	['目標市場行銷','潛在獲利能力'],
	['製作的基礎','製作內容之競爭力','價值創造(獲利性)']
];
var layerMovieList=[
	['負責人(監製)的資歷','負責人(監製)過去作品票房紀錄','負責人(監製)過去作品參展與得獎數','負責人(監製)曾經執行的最大片預算'],
	['負責人(監製)的預算控管能力','公司營運及財務狀況'],
	['製作團隊的資歷','製作團隊過去作品票房紀錄','製作團隊過去作品參展與得獎數','在業界活躍程度(參與評審、創投…等)'],
	['過去公司投融資之成效','過去公司獎補助之成效'],
	['編劇的資歷、學歷','編劇的過去作品票房紀錄','編劇的過去作品參展與得獎數'],
	['製片的資歷、學歷','製片的專案資源整合能力','製片的過去作品票房紀錄','製片的過去作品參展與得獎數'],
	['導演的資歷、學歷','導演的專案資源整合能力','導演的過去作品票房紀錄','導演的過去作品參展與得獎數'],
	['演員的資歷','演員的過去作品票房紀錄','演員的過去作品參展與得獎數','演員的媒體曝光率(包含搜尋引擎及社群平台搜尋次數)','演員的商演、商業代言規模','演員的知名度'],
	['製作團隊合作次數','製作團隊過去作品票房紀錄','製作團隊過去作品參展與得獎數','新銳成員的潛力'],
	['題材類型(潮流，與當時社會氛圍接軌)','同類型影片過去票房','同類型影片過去參展得獎數'],
	['劇本的跨地域(行銷國際)程度','同類型劇本過去票房','同類型劇本過去參展與得獎數','同類型劇本過去公眾討論度','改編劇本創新程度','改編文學作品或IP之知名度及影響力'],
	['編劇者知名度','劇本內容'],
	['過去同類型影片預算','過去同類型影片市場回收','預算分配比例','預算執行狀況'],
	['業內投資情況','自有資金投入程度'],
	['預算執行效率','製作團隊向心力','製作經費支用控管能力','製作時程管理'],
	['已完成之製作相關合約','已完成之合作意向書'],
	['影片播放契約','周邊商品契約'],
	['行銷企劃能力','已完成之行銷合約','合作行銷廠商質量 (過去行銷專案的實績)'],
	['預算及回收合理性','執行團隊利潤分配合理性'],
	['創投支持及參展紀錄','已完成之銷售合約(預售版權)','通路(戲院)/發行商合作與廳數保證情況','各戲院之上映檔期'],
	['海外市場銷售限制','預估獲利收益之情形'],
	['潛在合作行銷廠商(媒體、企業無形資產、品牌效益、贊助等)','傳統媒體(如報紙、雜誌、廣播、電視)的擴散效果','新媒體(網路媒體，如NOWnews)的擴散效果','社群媒體(如Facebook)的討論程度'],
	['負責人(監製)的經驗水準','管理能力'],
	['製作團隊組合','資金籌措能力'],
	['編劇能力','製片能力','導演能力','演員(男/女主角)能力及受歡迎程度','製作團隊默契'],
	['題材的潛力','劇本的競爭性','劇本內容品質確認'],
	['預算之合理性','資金到位程度','製作管理能力','契約確認'],
	['銷售契約','行銷能力'],
	['利潤分配結構','預售情形','投資報酬率','擴散效果'],
	['負責人(監製)的能力','企業能力(電影公司能力)'],
	['製作能力','核心元素之品質','完工能力'],
	['目標市場行銷','潛在獲利能力'],
	['製作基礎','製作內容之競爭力','價值創造(獲利性)']
]
if(type=="TV"){
	$.each(layerTVList[list_ID], function(){
		displayHelper._addOption(this);
	});
}else{
	$.each(layerMovieList[list_ID], function(){
		displayHelper._addOption(this);
	});
}
// add each option


}

/**
 * purpose: add an option to the option list
 *
 * @param String option the option text
 */
displayHelper._addOption = function(option){

	option.trim();

	if(option.length > 0){
		$('<tr class="new"><td class="index"></td><td class="option">' + option + '</td><td><a href="#" class="removeParent">[x]</a></td></tr>')
		.appendTo('#optionsList').hide().fadeIn('slow');

		// clear the option text
		displayHelper._resetOptionInputText();

		// bind the remove event to the delete button
		displayHelper._bindRemoveEvents();

		// update the table index. This will renumber the table rows.
		displayHelper._updateTableIndex();
	}
};

/**
 * purpose: clear the text in the input: #optionText
 */
displayHelper._resetOptionInputText = function(){
	$('#optionText').val('');

};

/**
 * purpose: reset the poll using the values in the Object poll as the new poll values
 *
 * @param Object poll an object with the question and options for the poll
 */
displayHelper._resetPoll = function(poll){
	// remove the existing poll options
	$('#optionsList').empty();

	// set the poll question
	$('.questionTextInput').val(poll.question);

	// set the poll options
	$.each(poll.options, function(i,n){
		console.log($(this));
		displayHelper._addOption(n);
	});

	// stop the poll
	displayHelper.stopPoll();
};

/**
 * purpose: bind a remove event to the remove link for an option
 */
displayHelper._bindRemoveEvents = function(){
	$('#optionsList tr.new .removeParent').click(function(){
		$(this).parent().parent().remove();
		displayHelper._updateTableIndex();
	});

	$('#optionsList tr.new').removeClass('new');
};

/**
 * purpose: function to stop a poll. This function is bound to a button.
 */
displayHelper.stopPoll = function(){
	// hide the stop poll button container
	$('.stopPoll').hide();

	// hide the poll questions container
	$('.changePoll, #pollQuestions').hide();

	// show hidden containers for setup
	$('.newOption, .removeParent, .startPoll, .setup').show('slow');

	// show the existing poll results
	$('#pollResults').show();
};

/**
 * purpose: function to change a poll. This allows the user to change the poll values.
 * This function is bound to a button.
 */
displayHelper.changePoll = function(){
	// hide the stop poll button container
	$('.stopPoll').hide();

	//show the change poll container
	$('.changePoll').show();

	// show the existing poll results
	$('#pollResults').show();
};

/**
 * purpose: function to start a poll. This function is bound to a button.
 */
displayHelper.startPoll = function(){
	if($('#optionsList .option').length > 1){
		// hide the setup container
		$('.setup').hide();

		// display the stop poll button
		$('.stopPoll').show();

		// hide the existing poll results
		$('#pollResults').hide();

		// hide set up containers
		$('.newOption, .removeParent, .startPoll').hide();

		var pollSettings = {};
		pollSettings.optionArray = [];
		if($('#layerType option:selected').val()==0){
			var questionText=$('#layerType option:selected').text() + ":" +$('#layerTVList option:selected').text();
		}else{
			var questionText=$('#layerType option:selected').text() + ":" +$('#layerMovieList option:selected').text();
		}
		pollSettings.questionText = questionText;//$('.questionTextInput').val();

		// extract the options
		var optionArray = [];
		$('#optionsList .option').each(function(i, n){
			pollSettings.optionArray[pollSettings.optionArray.length] = $(this).text();
		});

		//pollSettings.voteType = $("input[name='votingType']:checked").val();
        pollSettings.voteType = "detailedVoting";

		// start the poll
		ahp.startPoll(pollSettings);

	}
};

/**
 * purpose: update the option list index
 */
displayHelper._updateTableIndex = function(){
	$('#optionsList .index').each(function(index){
		$(this).html('<strong>option ' + (index+1) + ': </strong>');
	});
};

var ahp = {};

/**
 * the question text
 */
ahp.question = '';

/**
 * array to store the votes
 */
ahp.resultArray = [];

/**
 * array to store the options that are presented as pairs
 */
ahp.optionArray = [];

/**
 * the score values
 */
ahp.scores = {eq: 1, low: 2, high: 4};

/**
 * the index of the current pair with respect to the total number of questions that will be asked
 */
ahp.questionIndex = 1;

/**
 * the total number of questions that will be asked. initialized when the poll is started
 */
ahp.questionTotal = 0;

// the index of the current result set. Used to number each result set.
ahp.resultCount = 1;


/**
 * purpose: start the poll
 *
 * @param Array optionArray the options to be presented as pairs for voting
 * @param String questionText the question
 */
ahp.startPoll = function(pollSettings){
	// setup the questions and options
	ahp.question = pollSettings.questionText;
	ahp.optionArray = pollSettings.optionArray;

	ahp._setVotingType(pollSettings);

	// setup the result array
	ahp._setUpResultArray();

	// determine the total number of questions
	ahp._initializeQuestionCount();

	// display the first pair
	ahp._displayNextQuestion();
	$('#pollQuestions').show('slow');
};

/**
 * purpose: initialize the question count
 */
ahp._initializeQuestionCount = function(){
	ahp.questionIndex = 1;
	ahp.questionTotal = ((ahp.optionArray.length * ahp.optionArray.length) - ahp.optionArray.length) / 2;
};

/**
 * purpose: hide/show vote buttons based on voteType
 *
 * @param Object pollSettings
 */
ahp._setVotingType = function(pollSettings){
	if(pollSettings.voteType){
		 switch (pollSettings.voteType) {
		 	case 'simpleVoting':
		 		$('.detailedPollButtons').hide();
		 		$('.simplePollButtons').show();
		 		break;

		 	case 'detailedVoting':
		 		$('.simplePollButtons').hide();
		 		$('.detailedPollButtons').show();
		 		break;

		 	default:
		 		break;
		 }
	}
};

/**
 * purpose: display the next pair. If there are no more pairs, then calculate the results.
 */
ahp._displayNextQuestion = function(){
	// get the next pair
	var nextQuestion = ahp._getNextQuestion(this.optionArray, this.resultArray);

	if(nextQuestion !== false){
		// display the pair
		$('.questionTextDisplay').text(ahp.question);
		$('.questionIndex').text('輪詢題目  '+ ahp.questionIndex +' 之 ' + ahp.questionTotal);
		$('#pollQuestion1').text(ahp.optionArray[nextQuestion[0]]);
		$('#pollQuestion2').text(ahp.optionArray[nextQuestion[1]]);
		ahp._bindVoteEvents(nextQuestion);
	} else {
		// calculate the results
		ahp._unbindVoteEvents();
		ahp._calculateResult();
	}

};

/**
 * purpose: unbind the events on the voting buttons
 */
ahp._unbindVoteEvents = function(){
	$('.simplePollButtons button[type="button"]').each(function(){
		$(this).unbind('click');
	});

	$('.detailedPollButtons input[type="button"]').each(function(){
		$(this).unbind('click');
	});
};

/**
 * purpose: bind the events to the voting buttons
 */
ahp._bindVoteEvents = function(nextQuestionArr){
	ahp._unbindVoteEvents();

	var leftpair = nextQuestionArr;
	var rightpair = [nextQuestionArr[1], nextQuestionArr[0] ];

	ahp._bindSimpleVoteEvents(leftpair, rightpair);
	ahp._bindDetailedVoteEvents(leftpair, rightpair);
};

/**
 * purpose: bind the events to the simple buttons
 */
ahp._bindSimpleVoteEvents = function(leftpair, rightpair){
	$('.simplePollButtons #L_MuchMore').click(function(){
		ahp.recordVote(leftpair, ahp.scores.high);
	});

	$('.simplePollButtons #L_SlightlyMore').click(function(){
		ahp.recordVote(leftpair, ahp.scores.low);
	});

	$('.simplePollButtons #L_R_Same').click(function(){
		ahp.recordVote(leftpair, ahp.scores.eq);
	});

	$('.simplePollButtons #R_SlightlyMore').click(function(){
		ahp.recordVote(rightpair, ahp.scores.low);
	});

	$('#R_MuchMore').click(function(){
		ahp.recordVote(rightpair, ahp.scores.high);
	});
};

/**
 * purpose: bind the events to the detailed buttons
 */
ahp._bindDetailedVoteEvents = function(leftpair, rightpair){
	$('.detailedPollButtons input[type="button"].leftMore').each(function(){
		$(this).click(function(){
			ahp.recordVote(leftpair, parseInt($(this).val(), 10));
		});
	});

	$('.detailedPollButtons input[type="button"].rightMore').each(function(){
		$(this).click(function(){
			ahp.recordVote(rightpair, parseInt($(this).val(), 10));
		});
	});

	$('.detailedPollButtons input[type="button"].same').click(function(){
		ahp.recordVote(leftpair, 1);
	});
};


/**
 * purpose: record a vote
 *
 * @param Array pair the index of the questions in optionArray
 * @param Integer score the value of the vote
 */
ahp.recordVote = function (pair, score){
	console.log(pair, score);

	// record the scores
	ahp.resultArray[pair[0]][pair[1]] = score;
	ahp.resultArray[pair[1]][pair[0]] = 1/score;

	// increment the question index
	ahp.questionIndex ++;

	// display the next pair
	ahp._displayNextQuestion();
};

/**
 * purpose: calculate the results
 */
ahp._calculateResult = function(){
	console.log('calculating results ...');

	// hide questions
	$('#pollQuestions').hide('slow');

	// calc results
	var calcResults = ahpCalc.calculateResults(this.resultArray);

	// display the results
	ahp._displayResults(calcResults);

	displayHelper.changePoll();
};

/**
 * purpose: display the result table
 */
ahp._displayResults = function(calcResults){
	var html = '';
	var resultId = 'result_set_' +	ahp.resultCount;

	// remove the current class from existing result tables
	$('table.current').removeClass('current');


	html += '<table class="current pollResultTable">';

	// the question text
	html +=	'<tr>' +
			'<td colspan="4" class="titleRow">結果顯示 #' +
			ahp.resultCount +
			': ' +
			'<span class="resultSetQuestionText">' +
			ahp.question +
			' </span>' +
			'</td></tr>';

	html += '<tr class="result_set resultColumnTitle">' +
			'<td>特徵</td>'	+
			'<td>權重</td>'	+
			//'<td>Scaled <br /> Result</td>' +
			'<td>&nbsp</td>'+
			'</tr>';

	// the option text and result values
	for(var i = 0; i < ahp.optionArray.length; i++){

		var resultText = this._convertRealToRoundedPercent(calcResults.resultColumn[i]);

		html += '<tr class="result_set" >' +
				'<td>' +
				// option title
				'<span class="resultSetOptionText">' + ahp.optionArray[i] + '</span>' +
				'</td>' +
				'<td>' +
				'<span class="result">' + resultText + '</span>' +
				'</td>' +
				//'<td>' +
				//'<span style="text-align: right;" class="scaledResult">' + resultText + '</span>' +
				//'</td>' +
				'<td>' +
				// bar
				'<div style="background-color:blue;width:' + (resultText * 1.2 * 100).toFixed(4) + 'px">&nbsp;</div>' +
				'</td>' +
				'</tr>';
	}
	// the question text
	html +=	'<tr class="result_set">' +
			'<td colspan="2" style="text-align: right;">&nbsp;</td>' +
			'<td colspan="2" style="text-align: left;">' +
			//'<input size="4" style="text-align: right;" class="resultScaleFactor" value="1"/>' +
			//'<button style="text-align: right;" class="scaleResults-new">Scale</button>' +
			'</td></tr>';

	// the consistancy calculation
	var consistencyRatioClass = '';
	if(calcResults.consistencyRatio < 0.11 ){
		consistencyRatioClass = 'green';
	}
	else {
		consistencyRatioClass = 'orange';
	}

	html +=	'<tr>' +
			'<td colspan="4" class = "' +
			 consistencyRatioClass +
			'">Consistency Ratio: ' +
			 this._convertRealToRoundedPercent(calcResults.consistencyRatio, 2) +
			'</td></tr>';

	html +=	'<tr>' +
			'<td colspan="4">Consistency Index: ' +
			 this._convertRealToRoundedPercent(calcResults.consistencyIndex, 2) +
			'</td></tr>';

	// the action buttons
	html +=	'<tr class="' + resultId +'" >' +
			'<td colspan="3">' +
			'<input type="button" class="retryPoll buttonControl" value="重試" />' +
			'<input type="button" class="togglePollResults buttonControl" value="隱藏/顯示" /></td></tr>';

	html += '</table>';

	// display the table
	$(html).insertAfter('#pollResults h3').hide().fadeIn('slow');

	// increment the result table count
	ahp.resultCount ++;

	// bind events to the buttons in the new table
	ahp._addRetryEvents(resultId);
	ahp._addResultToggleEvents(resultId);
	ahp._addScaleResultsEvents();
};

/**
 * purpose: round a real number
 */
ahp._convertRealToRoundedPercent = function(num, digits){
	var e = (digits) ? digits : 4;
	var f1 = Math.pow(10, e);

	// rounding will be done by adding half the last digit to last-digit + 1
	// f2 determines the position of last-digit + 1 and r is half the last digit
	var f2 = Math.pow(10, e+1);
	var r = 5 / f2;

	// calc rounded result
	var resultValue = ((((num + r ) * f1) + '').split('.', 1)/f1).toFixed(4);

	// convert to string
	resultValue = resultValue + '';

	return resultValue;
};

ahp._addScaleResultsEvents = function(){

	$('.scaleResults-new').click(function(){
		var scaleFactor = $(this).parent().find('.resultScaleFactor').get(0);
		scaleFactor = $(scaleFactor).val();

		$(this).parent().parent().parent().find('.result').each(function(){
			var curentVal = $(this).text();
			var scaledResult= $(this).parent().parent().find('.scaledResult').get(0);
			$(scaledResult).text(ahp._convertRealToRoundedPercent(curentVal * scaleFactor));
		});

	});

	// bind the enter key events
	var input = $('.scaleResults-new').parent().find('.resultScaleFactor').get(0);
	$(input).keypress(function (e) {
         if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
			var scaleFactor = $(this).val();

			$(this).parent().parent().parent().find('.result').each(function(){
				var curentVal = $(this).text();
				var scaledResult= $(this).parent().parent().find('.scaledResult').get(0);
				$(scaledResult).text(ahp._convertRealToRoundedPercent(curentVal * scaleFactor));
			});

         }
     });

	$('.scaleResults-new').removeClass();
};


/**
 * purpose: bind the retry event to the retry button in the result table
 */
ahp._addRetryEvents = function(resultId){

	// bind the button click event to the retry function
	$('.'+ resultId + ' input.retryPoll').click(function(){
		ahp._retryPoll(resultId);
	});
};

/**
 * purpose: function to toggle the display of rows in the result table.
 * This function is bound to a button in the result table.
 */
ahp._addResultToggleEvents = function(resultId){

	// toggle the rows
	$('.'+ resultId + ' input.togglePollResults').click(function(){
		$(this).parent().parent().parent().find('.result_set').toggle();
	});
};

/**
 * purpose: function to retry a poll. This function is bound to a button
 * in the result table.
 */
ahp._retryPoll = function(resultId){
	var poll = {};
	poll.options = [];

	// get the poll question text from the result table
	poll.question = $('.' + resultId).parent().find('.resultSetQuestionText').text();

	// get the poll options from the result table
	$('.' + resultId).parent().find('.resultSetOptionText').each(function(i){
		poll.options[i] = $(this).text();
	});

	// reset the poll using the result question and options
	displayHelper._resetPoll(poll);
};

/**
 * purpose: setup the result array
 */
ahp._setUpResultArray = function(){
	this.resultArray = ahpArrayHelper._setUpSquareArray(this.optionArray.length);
};

/**
 * purpose: find the next pair to display.
 *
 * @param Array optionArray an array of poll options
 * @return Array the row and column of the next unanswered question pair
 * @return Boolean returns false if there are no more pairs
 */
ahp._getNextQuestion = function(optionArray, resultArray){
	for(var i = 0; i < optionArray.length; i++){
		for(var j = 0; j < optionArray.length; j++){
			if(resultArray[i][j] === 0){
				return [i, j];
			}
		}
	}
	return false;
};




/**
 * purpose: execute functions on document load
 */
$(document).ready(function(){
	// intialize the poll
	displayHelper.initializePoll();

});
