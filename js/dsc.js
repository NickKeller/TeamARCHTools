// Probability Constants
const pIV = 0.0008;
const pRV = 0.0008;
const pIO = 0.0;
const pRO = 0.0004;
const pIA = 0.0062;
const pRA = 0.0140;

// Risk Ratio Constants
const RR_CONDOM = 5.04;
const RR_ART = 25.0;
const RR_PREP_HET = 3.45;
const RR_PREP_MSM = 1.79;
const RR_CIRC_VAG = 1.85;
const RR_CIRC_ANAL = 3.41;

var ulcerPresentPercent = 0;
var isMale = true;

var _rrCondom, _rrArt, _rrPrepHetro, _rrPrepMsm, _rrCircVag, _rrCircAnal;
_rrCondom = RR_CONDOM;

var InsertVagProtectedRiskFactor=1, InsertVagUnprotectedRiskFactor=1,
    ReceptiveVagProtectedRiskFactor=1, ReceptiveVagUnprotectedRiskFactor=1,
    InsertAnalProtectedRiskFactor=1, InsertAnalUnprotectedRiskFactor=1,
    ReceptiveAnalProtectedRiskFactor=1, ReceptiveAnalUnprotectedRiskFactor=1,
    GiveOralProtectedRiskFactor=1, GiveOralUnprotectedRiskFactor=1,
    ReceiveOralProtectedRiskFactor=1, ReceiveOralUnprotectedRiskFactor = 1;

function UpdateArtRatios(isOnArt) {
    if (isOnArt)
        _rrArt = RR_ART;
    else
        _rrArt = 1;
}

function UpdateCircumsizeRatios(isCircumcised) {
    if (isCircumcised && isMale)
        _rrCircVag = RR_CIRC_VAG;
    else
        _rrCircVag = 1;

    if (isCircumcised && isMale)
        _rrCircAnal = RR_CIRC_ANAL;
    else
        _rrCircAnal = 1;
}

function UpdateGenderRatios(_isMale) {
    isMale = _isMale;
}

function UpdatePrepRatios(isOnPrep) {
    if (isOnPrep)
        _rrPrepHetro = RR_PREP_HET;
    else
        _rrPrepHetro = 1;

    if (isOnPrep)
        _rrPrepMsm = RR_PREP_MSM;
    else
        _rrPrepMsm = 1;
}

function calcInsertVagProtectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    var actsPerMonth = timesPerMonth;
    var percentCondomUsage = percentWithCondomUsage/100.0;

    var riskFactor = Math.pow(1-(pIV/(_rrCondom*_rrArt*_rrPrepHetro*_rrCircVag)), timesPerMonth*percentWithCondomUsage);

    InsertVagProtectedRiskFactor = riskFactor;
}

function calcInsertVagUnprotectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
   var actsPerMonth = timesPerMonth;
   var percentCondomUsage = percentWithCondomUsage/100.0;

   var riskFactor = Math.pow(1-(pIV/(_rrArt*_rrPrepHetro*_rrCircVag)), actsPerMonth*(1-percentCondomUsage));

   InsertVagUnprotectedRiskFactor = riskFactor;
}


function calcReceptiveVagProtectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    var actsPerMonth = timesPerMonth;
    var percentCondomUsage = percentWithCondomUsage/100.0;

    var riskFactor = Math.pow(1-(pRV/(_rrCondom*_rrArt*_rrPrepHetro)), actsPerMonth*percentCondomUsage);

    ReceptiveVagProtectedRiskFactor =  riskFactor;

}
function calcReceptiveVagUnprotectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    var actsPerMonth = timesPerMonth;
    var percentCondomUsage = percentWithCondomUsage/100.0;

    var riskFactor = Math.pow(1-(pRV/(_rrArt*_rrPrepHetro)), actsPerMonth*(1-percentCondomUsage));

    ReceptiveVagUnprotectedRiskFactor = riskFactor;

}

function calcReceiveOralProtectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    var actsPerMonth = timesPerMonth;
    var percentCondomUsage = percentWithCondomUsage/100.0;

    var riskFactor = Math.pow(1-(pIO/(_rrCondom*_rrArt*_rrPrepHetro)), actsPerMonth*percentCondomUsage);

    ReceiveOralProtectedRiskFactor = riskFactor;

}

function calcReceiveOralUnprotectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    var actsPerMonth = timesPerMonth;
    var percentCondomUsage = percentWithCondomUsage/100.0;

    var riskFactor =Math.pow(1-(pIO/(_rrArt*_rrPrepHetro)), actsPerMonth*(1-percentCondomUsage));

    ReceiveOralUnprotectedRiskFactor = riskFactor;

}

function calcGiveOralProtectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    var actsPerMonth = timesPerMonth;
    var percentCondomUsage = percentWithCondomUsage/100.0;

    var riskFactor =Math.pow(1-(pRO/(_rrCondom*_rrArt*_rrPrepHetro)), actsPerMonth*percentCondomUsage);

    GiveOralProtectedRiskFactor = riskFactor;

}

function calcGiveOralUnprotectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    var actsPerMonth = timesPerMonth;
    var percentCondomUsage = percentWithCondomUsage/100.0;

    var riskFactor =Math.pow(1-(pRO/(_rrArt*_rrPrepHetro)), actsPerMonth*(1-percentCondomUsage));

    GiveOralUnprotectedRiskFactor = riskFactor;

}

function calcInsertAnalProtectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    var actsPerMonth = timesPerMonth;
    var percentCondomUsage = percentWithCondomUsage/100.0;

    var riskFactor =Math.pow(1-(pIA/(_rrCondom*_rrArt*_rrPrepMsm*_rrCircAnal)), actsPerMonth*percentCondomUsage);

    InsertAnalProtectedRiskFactor = riskFactor;


}

function calcInsertAnalUnprotectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    var actsPerMonth = timesPerMonth;
    var percentCondomUsage = percentWithCondomUsage/100.0;

    var riskFactor =Math.pow(1-(pIA/(_rrArt*_rrPrepMsm*_rrCircAnal)), actsPerMonth*(1-percentCondomUsage));

    InsertAnalUnprotectedRiskFactor = riskFactor;


}

function calcReceptiveAnalProtectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    var actsPerMonth = timesPerMonth;
    var percentCondomUsage = percentWithCondomUsage/100.0;

    var riskFactor =Math.pow(1-(pRA/(_rrCondom*_rrArt*_rrPrepMsm)), actsPerMonth*percentCondomUsage);

    ReceptiveAnalProtectedRiskFactor = riskFactor;
    return riskFactor;

}

function calcReceptiveAnalUnprotectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    var actsPerMonth = timesPerMonth;
    var percentCondomUsage = percentWithCondomUsage/100.0;

    var riskFactor =Math.pow(1-(pRA/(_rrArt*_rrPrepMsm)), actsPerMonth*(1-percentCondomUsage));

    ReceptiveAnalUnprotectedRiskFactor = riskFactor;
}


function updateStats ()
{
    var _chancesPerMonthPercent = 1 - (InsertVagUnprotectedRiskFactor * InsertVagProtectedRiskFactor *
                          ReceptiveVagProtectedRiskFactor * ReceptiveVagUnprotectedRiskFactor *
                          ReceiveOralProtectedRiskFactor * ReceiveOralUnprotectedRiskFactor *
                          GiveOralProtectedRiskFactor * GiveOralUnprotectedRiskFactor *
                          InsertAnalProtectedRiskFactor * InsertAnalUnprotectedRiskFactor *
                          ReceptiveAnalProtectedRiskFactor * ReceptiveAnalUnprotectedRiskFactor);

    var _chancesPerMonthRatio = 1 / _chancesPerMonthPercent;

    var _chancesPerYearPercent = 1-Math.pow(1-_chancesPerMonthPercent,12);
    var _chancesPerYearRatio = 1 / _chancesPerYearPercent;

    var _chancesPerTenYearPercent = 1-Math.pow(1-_chancesPerYearPercent,10);
    var _chancesPerTenYearRatio = 1 / _chancesPerTenYearPercent;

    var _chancesPerTwentyFiveYearPercent = 1-Math.pow(1-_chancesPerYearPercent,25);
    var _chancesPerTwentyFiveYearRatio = 1 / _chancesPerTwentyFiveYearPercent;

    $("#monthper").html((100*_chancesPerMonthPercent).toFixed(1)+"%");
    $("#yearper").html((100*_chancesPerYearPercent).toFixed(1)+"%");
    $("#10yearper").html((100*_chancesPerTenYearPercent).toFixed(1)+"%");
    $("#25yearper").html((100*_chancesPerTwentyFiveYearPercent).toFixed(1)+"%");

    $("#monthodds").html("1 in " + _chancesPerMonthRatio.toFixed(0));
    $("#yearodds").html("1 in " + _chancesPerYearRatio.toFixed(0));
    $("#10yearodds").html("1 in " + _chancesPerTenYearRatio.toFixed(0));
    $("#25yearodds").html("1 in " + _chancesPerTwentyFiveYearRatio.toFixed(0));

    var _riskProductByIV = InsertVagUnprotectedRiskFactor * InsertVagProtectedRiskFactor;
    var _riskProductByRV = ReceptiveVagProtectedRiskFactor * ReceptiveVagUnprotectedRiskFactor;
    var _riskProductByRO = ReceiveOralProtectedRiskFactor * ReceiveOralUnprotectedRiskFactor;
    var _riskProductByGO = calcGiveOralProtectedRiskFactor * GiveOralUnprotectedRiskFactor;
    var _riskProductByIA = calcInsertAnalProtectedRiskFactor * InsertAnalUnprotectedRiskFactor;
    var _riskProductByRA = calcReceptiveAnalProtectedRiskFactor * ReceptiveAnalUnprotectedRiskFactor;

    var _totalProtectedRiskFactor = InsertVagProtectedRiskFactor * ReceptiveVagProtectedRiskFactor * ReceiveOralProtectedRiskFactor *
      GiveOralProtectedRiskFactor * InsertAnalProtectedRiskFactor * ReceptiveAnalProtectedRiskFactor;

    var _totalUnprotectedRiskFactor = _totalProtectedRiskFactor * InsertVagUnprotectedRiskFactor
    * ReceptiveVagUnprotectedRiskFactor * ReceiveOralUnprotectedRiskFactor
    * GiveOralUnprotectedRiskFactor * InsertAnalUnprotectedRiskFactor
    * ReceptiveAnalUnprotectedRiskFactor;

    var _riskByIV = 1 - _riskProductByIV;
    var _riskByRV = 1 - _riskProductByRV;
    var _riskByRO = 1 - _riskProductByRO;
    var _riskByGO = 1 - _riskProductByGO;
    var _riskByIA = 1 - _riskProductByIA;
    var _riskByRA = 1 - _riskProductByRA;


    var totalContribToRisk = _riskByIV + _riskByRV + _riskByRO + _riskByGO + _riskByIA + _riskByRA;
    var _ivContribPercent = (_riskByIV / totalContribToRisk) * 100;
    var _rvContribPercent = (_riskByRV / totalContribToRisk) * 100;
    var _roContribPercent = (_riskByRO / totalContribToRisk) * 100;
    var _goContribPercent = (_riskByGO / totalContribToRisk) * 100;
    var _raContribPercent = (_riskByRA / totalContribToRisk) * 100;
    var _iaContribPercent = (_riskByIA / totalContribToRisk) * 100;

    var _ivPieSlice = (_riskByIV / totalContribToRisk) * 360;
    var _rvPieSlice = (_riskByRV / totalContribToRisk) * 360;
    var _roPieSlice = (_riskByRO / totalContribToRisk) * 360;
    var _goPieSlice = (_riskByGO / totalContribToRisk) * 360;
    var _raPieSlice = (_riskByRA / totalContribToRisk) * 360;
    var _iaPieSlice = (_riskByIA / totalContribToRisk) * 360;


    var riskUnprotected = 1 - _totalUnprotectedRiskFactor;
    var riskProtected = 1- _totalProtectedRiskFactor;

    var totalCondomUsageContributions = riskProtected + riskUnprotected;

    var _protectedPieSlice = (riskProtected/ totalCondomUsageContributions) * 360;
    var _unprotectedPieSlice = (riskUnprotected/ totalCondomUsageContributions) * 360;
    var _protectedPercent = (riskProtected/ totalCondomUsageContributions) * 100;
    var _unprotectedPercent = (riskUnprotected/ totalCondomUsageContributions) * 100;
}
