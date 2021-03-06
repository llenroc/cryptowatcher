﻿myApp.controller('homeController', function ($scope,$templateCache, $log, $http, $window, $timeout, $uibModal, cryptoApiService) {

    $scope.loaderVisibility = true;
    $scope.newCurrencyList = [];
    $scope.activeTab = 0;
    $scope.f = {};
    $scope.rsiPeriod = "14";
   

    var currencyList = [];

    // dynamically added tabs
    $scope.currencyTabs = [];
    $scope.removeTab = removeTab;
    $scope.addTab = addTab;

    // utils
    $scope.loadData = loadData;
    $scope.loadDataWithRsi = loadDataWithRsi;
    $scope.searchNewCurrency = searchNewCurrency;
    $scope.refreshData = refreshData;
    $scope.get24hChange = get24hChange;
    $scope.get24hColor = get24hColor;
    $scope.changeRsiPeriod = changeRsiPeriod;
    $scope.resetRsiData = resetRsiData;
    $scope.loadDayChartData = loadDayChartData;
    $scope.displayDayChart = displayDayChart;
    $scope.openPopover = openPopover;

    // Life start here!!!
    $scope.searchNewCurrency();
    $scope.loadData();

    // ##################################################################
// ----------------------Popover------------------------
    $scope.dynamicPopover = {
        templateUrl: 'myPopoverTemplate.html',
    };

    //Open a popover and show the procurement bullet chart
    function openPopover (currency) {
        $scope.loaderPopoverVisibility = true;
        $scope.loadDayChartData(currency);
    }

    function loadDayChartData(currency) {
        $scope.chartDayVolume = [];
        $scope.chartDayValue = [];
        cryptoApiService.getPoloniexDayChartData(currency).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                $scope.chartDayVolume.push([response.data[i].date * 1000, response.data[i].volume]);
                $scope.chartDayValue.push([response.data[i].date * 1000, response.data[i].open, response.data[i].high, response.data[i].low, response.data[i].close]);
            }
            $scope.displayDayChart(currency);
        }, function (error) {
            $log.error(error.message);
        });
    };

    function displayDayChart(currency) {
        $scope.chartDayData = [];
        $scope.chartDayData.push({
            id: 'abc',
            name: currency,
            data: $scope.chartDayValue,
            type: 'candlestick',
            yAxis: 0,
            dataGrouping: {
                units: groupingDayUnits
            }
        });

        $scope.chartDayData.push({
            name: 'volume',
            data: $scope.chartDayVolume,
            type: 'column',
            yAxis: 1,
            dataGrouping: {
                units: groupingDayUnits
            }
        }); 
        
        $scope.dynamicPopover = {
            chartDayData:  $scope.chartDayData,
            templateUrl: 'myPopoverTemplate.html',
            currencyName: currency,
        };
    };
    groupingDayUnits = [['hour', [1]]];

    function changeRsiPeriod(rsiPeriod){
        $scope.rsiPeriod = rsiPeriod;
        $scope.resetRsiData($scope.currencyListBTC);
        $scope.resetRsiData($scope.currencyListETH);
        $scope.resetRsiData($scope.currencyListXMR);
        $scope.resetRsiData($scope.currencyListUSD);
        $scope.loadDataWithRsi();
    }

    function get24hChange(value) {
        return (value * 100).toFixed(2);
    }

    function get24hColor(value) {
        if (value > 0) return "green";
        if (value < 0) return "red";
        if (value === 0) return "black";
    }

    //check if there are new currency and display 1 week an alert message
    function searchNewCurrency(currencyType) {
        cryptoApiService.getNewCurrencyList().then(function (response) {
            $scope.newCurrencyList = response.data;
        }, function (error) { $log.error(error.message); });
    }

    function loadData(currencyType) {
        $scope.loaderVisibility = true;
        //First pass we load all curency without the RSI indicator
        cryptoApiService.getPoloniexData($scope.rsiPeriod, "").then(function (response) {
            $scope.loaderVisibility = false;
            $scope.currencyListBTC = [];
            $scope.currencyListETH = [];
            $scope.currencyListXMR = [];
            $scope.currencyListUSD = [];
            currencyList = response.data;
            for (var i = 0; i < currencyList.length; i++) {
     
                roundList(currencyList);

                if (currencyList[i].name.substring(0, 3) === "ETH") $scope.currencyListETH.push(currencyList[i]);
                if (currencyList[i].name.substring(0, 3) === "BTC") $scope.currencyListBTC.push(currencyList[i]);
                if (currencyList[i].name.substring(0, 3) === "XMR") $scope.currencyListXMR.push(currencyList[i]);
                if (currencyList[i].name.substring(0, 3) === "USD") $scope.currencyListUSD.push(currencyList[i]);
            };
            $scope.loadDataWithRsi();
        }, function (error) { $log.error(error.message); });
    };

    //Second pass to load the RSI behind the scene as it take 20 second
    function loadDataWithRsi() {
        cryptoApiService.getPoloniexData($scope.rsiPeriod, "USD").then(function (response) {
            currencyList = response.data;
            roundList(currencyList);
            $scope.currencyListUSD = currencyList;
        }, function (error) { $log.error(error.message); });

        cryptoApiService.getPoloniexData($scope.rsiPeriod, "ETH").then(function (response) {
           currencyList = response.data;
           roundList(currencyList);
           $scope.currencyListETH = currencyList;
        }, function (error) { $log.error(error.message); });

        cryptoApiService.getPoloniexData($scope.rsiPeriod, "BTC").then(function (response) {
           currencyList = response.data;
           roundList(currencyList);
           $scope.currencyListBTC = currencyList;
        }, function (error) { $log.error(error.message); });

        cryptoApiService.getPoloniexData($scope.rsiPeriod, "XMR").then(function (response) {
           currencyList = response.data;
           roundList(currencyList);
           $scope.currencyListXMR = currencyList;
        }, function (error) { $log.error(error.message); });
    };

    function roundList(theList) {
        for (var i = 0; i < theList.length; i++) {
            if(parseFloat(theList[i].last)> 0.001)theList[i].last = parseFloat(theList[i].last).toFixed(4);        
            if(parseFloat(theList[i].lowestAsk)> 0.001)theList[i].lowestAsk = parseFloat(theList[i].lowestAsk).toFixed(4);        
            if(parseFloat(theList[i].highestBid)> 0.001)theList[i].highestBid = parseFloat(theList[i].highestBid).toFixed(4);        
            if(parseFloat(theList[i].high24hr)> 0.001)theList[i].high24hr = parseFloat(theList[i].high24hr).toFixed(4);        
            if(parseFloat(theList[i].low24hr)> 0.001)theList[i].low24hr = parseFloat(theList[i].low24hr).toFixed(4);        
            if(parseFloat(theList[i].baseVolume)> 0.001)theList[i].baseVolume = parseFloat(theList[i].baseVolume).toFixed(0);        
        if(parseFloat(theList[i].quoteVolume)> 0.001)theList[i].quoteVolume = parseFloat(theList[i].quoteVolume).toFixed(0);    
        }    

    }
    
    function resetRsiData(currencyList){
        for (var i = 0; i < currencyList.length; i++) {
            currencyList[i].rsi = null;
        };
    }


    /* DYNAMIC TAB RELATED FUNCTIONS  */
    /* Remove tab from list of dynamic tabs */
    function removeTab(index) {
        $log.warn("Removing tab index " + index);
        $scope.currencyTabs.splice(index, 1);

        $timeout(function () {
            $scope.activeTab = 0;
            //tabSelected(0);
        }, 350);
    };

    /* Upon user click add new tab
    TODO: don't add new tab if tab already exists*/
    function addTab(currencyName) {
        $scope.currencyTabs.push({ name: currencyName, logo: $scope.currencyLogo });

        $timeout(function () {
            $scope.activeTab = $scope.currencyTabs.length + 3;
        }, 350);
    };

    /* DYNAMIC TAB RELATED FUNCTIONS  */
    function refreshData() {
        $scope.loadData();
    };

});