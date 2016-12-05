
/**
 * This file contains the risk calculations for Discordant Couples.
 * @author Neal Kaviratna, based on SexualActStats.m  by jtq6 on 7/3/13.
 */

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

// Current risk ratios
var _rrCondom, _rrArt, _rrPrepHetro, _rrPrepMsm, _rrCircVag, _rrCircAnal;
_rrCondom = RR_CONDOM;

// Non act risk factors
var ulcerPresentPercent = 0;
var isMale = true;

// Sexual act risk factors and cotributors
// APM = Acts Per Month, PCU = Percent With Condom Usage
var InsertVagProtectedRiskFactor=1, InsertVagUnprotectedRiskFactor=1,
    ReceptiveVagProtectedRiskFactor=1, ReceptiveVagUnprotectedRiskFactor=1,
    InsertAnalProtectedRiskFactor=1, InsertAnalUnprotectedRiskFactor=1,
    ReceptiveAnalProtectedRiskFactor=1, ReceptiveAnalUnprotectedRiskFactor=1,
    GiveOralProtectedRiskFactor=1, GiveOralUnprotectedRiskFactor=1,
    ReceiveOralProtectedRiskFactor=1, ReceiveOralUnprotectedRiskFactor = 1;

var InsertVagProtectedLastAPM = 0, InsertVagUnprotectedLastAPM = 0,
    ReceptiveVagProtectedLastAPM = 0, ReceptiveVagUnprotectedLastAPM = 0,
    InsertAnalProtectedLastAPM = 0, InsertAnalUnprotectedLastAPM = 0,
    ReceptiveAnalProtectedLastAPM = 0, ReceptiveAnalUnprotectedLastAPM = 0,
    GiveOralProtectedLastAPM = 0, GiveOralUnprotectedLastAPM = 0,
    ReceiveOralProtectedLastAPM = 0, ReceiveOralUnprotectedRiLastAPM = 0;

var InsertVagProtectedLastPCU = 0, InsertVagUnprotectedLastPCU = 0,
    ReceptiveVagProtectedLastPCU = 0, ReceptiveVagUnprotectedLastPCU = 0,
    InsertAnalProtectedLastPCU = 0, InsertAnalUnprotectedLastPCU = 0,
    ReceptiveAnalProtectedLastPCU = 0, ReceptiveAnalUnprotectedLastPCU = 0,
    GiveOralProtectedLastPCU = 0, GiveOralUnprotectedLastPCU = 0,
    ReceiveOralProtectedLastPCU = 0, ReceiveOralUnprotectedLastPCU = 0;


/**
 * UpdateArtRatios - updates risk ratios based on new ART info.
 * Recalc and Update in try-catch block in case all questions not answered yet
 *
 * @param  {bool} isOnArt Is the HIV-positive partner on ART?
 */
function UpdateArtRatios(isOnArt) {
    if (isOnArt)
        _rrArt = RR_ART;
    else
        _rrArt = 1;

    try {
        recalcStats();
        updateStats();
    } catch(err) {

    }
}

/**
 * UpdateCircumsizeRatios - updates risk ratios based on new Circumsision info.
 * Recalc and Update in try-catch block in case all questions not answered yet
 *
 * @param  {bool} isCircumcised is the Male HIV-negative partner circumsized?
 */
function UpdateCircumsizeRatios(isCircumcised) {
    if (isCircumcised && isMale)
        _rrCircVag = RR_CIRC_VAG;
    else
        _rrCircVag = 1;

    if (isCircumcised && isMale)
        _rrCircAnal = RR_CIRC_ANAL;
    else
        _rrCircAnal = 1;

    try {
        recalcStats();
        updateStats();
    } catch(err) {

    }
}

/**
 * UpdateGenderRatios - updates risk ratios based on new gender info.
 * Recalc and Update in try-catch block in case all questions not answered yet
 *
 * @param  {bool} _isMale is the HIV-positive partner male?
 */
function UpdateGenderRatios(_isMale) {
    isMale = _isMale;

    try {
        recalcStats();
        updateStats();
    } catch(err) {

    }
}

/**
 * UpdatePrepRatios - updates risk ratios based on new ART info.
 * Recalc and Update in try-catch block in case all questions not answered yet
 *
 * @param  {bool} isOnPrep is the HIV-negative partner on Prep?
 */
function UpdatePrepRatios(isOnPrep) {
    if (isOnPrep)
        _rrPrepHetro = RR_PREP_HET;
    else
        _rrPrepHetro = 1;

    if (isOnPrep)
        _rrPrepMsm = RR_PREP_MSM;
    else
        _rrPrepMsm = 1;

    try {
        recalcStats();
        updateStats();
    } catch(err) {

    }
}


/**
 * calcInsertVagProtectedRiskFactor
 *
 * @param  {float} timesPerMonth          # of times partners have piv sex/month
 * @param  {float} percentWithCondomUsage % of times partners use condoms
 */
function calcInsertVagProtectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    InsertVagProtectedLastAPM = timesPerMonth;
    InsertVagProtectedLastPCU = percentWithCondomUsage/100.0;

    var riskFactor = Math.pow(1-(pIV/(_rrCondom*_rrArt*_rrPrepHetro*_rrCircVag)), InsertVagProtectedLastAPM*InsertVagProtectedLastPCU);

    InsertVagProtectedRiskFactor = riskFactor;
    updateStats();
}

/**
 * calcInsertVagUnprotectedRiskFactor
 *
 * @param  {float} timesPerMonth          # of times partners have uiv sex/month
 * @param  {float} percentWithCondomUsage % of times partners use condoms
 */
function calcInsertVagUnprotectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
   InsertVagUnprotectedLastAPM = timesPerMonth;
   InsertVagUnprotectedLastPCU = percentWithCondomUsage/100.0;

   var riskFactor = Math.pow(1-(pIV/(_rrArt*_rrPrepHetro*_rrCircVag)), InsertVagUnprotectedLastAPM*(1-InsertVagUnprotectedLastPCU));

   InsertVagUnprotectedRiskFactor = riskFactor;
   updateStats();
}

/**
 * calcReceptiveVagProtectedRiskFactor
 *
 * @param  {float} timesPerMonth          # of times partners have prv sex/month
 * @param  {float} percentWithCondomUsage % of times partners use condoms
 */
function calcReceptiveVagProtectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    ReceptiveVagProtectedLastAPM = timesPerMonth;
    ReceptiveVagProtectedLastPCU = percentWithCondomUsage/100.0;

    var riskFactor = Math.pow(1-(pRV/(_rrCondom*_rrArt*_rrPrepHetro)), ReceptiveVagProtectedLastAPM*ReceptiveVagProtectedLastPCU);

    ReceptiveVagProtectedRiskFactor =  riskFactor;
    updateStats();
}

/**
 * calcReceptiveVagUnprotectedRiskFactor
 *
 * @param  {float} timesPerMonth          # of times partners have urv sex/month
 * @param  {float} percentWithCondomUsage % of times partners use condoms
 */
function calcReceptiveVagUnprotectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    ReceptiveVagUnprotectedLastAPM = timesPerMonth;
    ReceptiveVagUnprotectedLastPCU = percentWithCondomUsage/100.0;

    var riskFactor = Math.pow(1-(pRV/(_rrArt*_rrPrepHetro)), ReceptiveVagUnprotectedLastAPM*(1-ReceptiveVagUnprotectedLastPCU));

    ReceptiveVagUnprotectedRiskFactor = riskFactor;
    updateStats();
}

/**
 * calcReceiveOralProtectedRiskFactor
 *
 * @param  {float} timesPerMonth          # of times partners have pro sex/month
 * @param  {float} percentWithCondomUsage % of times partners use condoms
 */
function calcReceiveOralProtectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    ReceiveOralProtectedLastAPM = timesPerMonth;
    ReceiveOralProtectedLastPCU = percentWithCondomUsage/100.0;

    var riskFactor = Math.pow(1-(pIO/(_rrCondom*_rrArt*_rrPrepHetro)), ReceiveOralProtectedLastAPM*ReceiveOralProtectedLastPCU);

    ReceiveOralProtectedRiskFactor = riskFactor;
    updateStats();
}

/**
 * calcReceiveOralUnprotectedRiskFactor
 *
 * @param  {float} timesPerMonth          # of times partners have uro sex/month
 * @param  {float} percentWithCondomUsage % of times partners use condoms
 */
function calcReceiveOralUnprotectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    ReceiveOralUnprotectedLastAPM = timesPerMonth;
    ReceiveOralUnprotectedLastPCU = percentWithCondomUsage/100.0;

    var riskFactor =Math.pow(1-(pIO/(_rrArt*_rrPrepHetro)), ReceiveOralUnprotectedLastAPM*(1-ReceiveOralUnprotectedLastPCU));

    ReceiveOralUnprotectedRiskFactor = riskFactor;
    updateStats();
}

/**
 * calcGiveOralProtectedRiskFactor
 *
 * @param  {float} timesPerMonth          # of times partners have pgo sex/month
 * @param  {float} percentWithCondomUsage % of times partners use condoms
 */
function calcGiveOralProtectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    GiveOralProtectedLastAPM = timesPerMonth;
    GiveOralProtectedLastPCU = percentWithCondomUsage/100.0;

    var riskFactor =Math.pow(1-(pRO/(_rrCondom*_rrArt*_rrPrepHetro)), GiveOralProtectedLastAPM*GiveOralProtectedLastPCU);

    GiveOralProtectedRiskFactor = riskFactor;
    updateStats();
}

/**
 * calcGiveOralUnprotectedRiskFactor
 *
 * @param  {float} timesPerMonth          # of times partners have ugo sex/month
 * @param  {float} percentWithCondomUsage % of times partners use condoms
 */
function calcGiveOralUnprotectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    GiveOralUnprotectedLastAPM = timesPerMonth;
    GiveOralUnprotectedLastPCU = percentWithCondomUsage/100.0;

    var riskFactor =Math.pow(1-(pRO/(_rrArt*_rrPrepHetro)), GiveOralUnprotectedLastAPM*(1-GiveOralUnprotectedLastPCU));

    GiveOralUnprotectedRiskFactor = riskFactor;
    updateStats();
}

/**
 * calcInsertAnalProtectedRiskFactor
 *
 * @param  {float} timesPerMonth          # of times partners have pia sex/month
 * @param  {float} percentWithCondomUsage % of times partners use condoms
 */
function calcInsertAnalProtectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    InsertAnalProtectedLastAPM = timesPerMonth;
    InsertAnalProtectedLastPCU = percentWithCondomUsage/100.0;

    var riskFactor =Math.pow(1-(pIA/(_rrCondom*_rrArt*_rrPrepMsm*_rrCircAnal)), InsertAnalProtectedLastAPM*InsertAnalProtectedLastPCU);

    InsertAnalProtectedRiskFactor = riskFactor;
    updateStats();
}

/**
 * calcInsertAnalUnprotectedRiskFactor
 *
 * @param  {float} timesPerMonth          # of times partners have uia sex/month
 * @param  {float} percentWithCondomUsage % of times partners use condoms
 */
function calcInsertAnalUnprotectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    InsertAnalUnprotectedLastAPM = timesPerMonth;
    InsertAnalUnprotectedLastPCU = percentWithCondomUsage/100.0;

    var riskFactor =Math.pow(1-(pIA/(_rrArt*_rrPrepMsm*_rrCircAnal)), InsertAnalUnprotectedLastAPM*(1-InsertAnalUnprotectedLastPCU));

    InsertAnalUnprotectedRiskFactor = riskFactor;
    updateStats();
}

/**
 * calcReceptiveAnalProtectedRiskFactor
 *
 * @param  {float} timesPerMonth          # of times partners have pra sex/month
 * @param  {float} percentWithCondomUsage % of times partners use condoms
 */
function calcReceptiveAnalProtectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    ReceptiveAnalProtectedLastAPM = timesPerMonth;
    ReceptiveAnalProtectedLastPCU = percentWithCondomUsage/100.0;

    var riskFactor =Math.pow(1-(pRA/(_rrCondom*_rrArt*_rrPrepMsm)), ReceptiveAnalProtectedLastAPM*ReceptiveAnalProtectedLastPCU);

    ReceptiveAnalProtectedRiskFactor = riskFactor;
    updateStats();
}

/**
 * calcReceptiveAnalUnprotectedRiskFactor
 *
 * @param  {float} timesPerMonth          # of times partners have ura sex/month
 * @param  {float} percentWithCondomUsage % of times partners use condoms
 */
function calcReceptiveAnalUnprotectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    ReceptiveAnalUnprotectedLastAPM = timesPerMonth;
    ReceptiveAnalUnprotectedLastPCU = percentWithCondomUsage/100.0;

    var riskFactor =Math.pow(1-(pRA/(_rrArt*_rrPrepMsm)), ReceptiveAnalUnprotectedLastAPM*(1-ReceptiveAnalUnprotectedLastPCU));

    ReceptiveAnalUnprotectedRiskFactor = riskFactor;
    updateStats();
}


/**
 * recalcStats - Recalculates all stats with updated risk factors, necessary for
 * properly updating dynamic graphs.
 */
function recalcStats()
{
    recalcInsertVagProtectedRiskFactor();
    recalcInsertVagUnprotectedRiskFactor();
    recalcReceptiveVagProtectedRiskFactor();
    recalcReceptiveVagUnprotectedRiskFactor();
    recalcReceiveOralProtectedRiskFactor();
    recalcReceiveOralUnprotectedRiskFactor();
    recalcGiveOralProtectedRiskFactor();
    recalcGiveOralUnprotectedRiskFactor();
    recalcInsertAnalProtectedRiskFactor();
    recalcInsertAnalUnprotectedRiskFactor();
    recalcReceptiveAnalProtectedRiskFactor();
    recalcReceptiveAnalUnprotectedRiskFactor();
}


function recalcInsertVagProtectedRiskFactor()
{
    var riskFactor = Math.pow(1-(pIV/(_rrCondom*_rrArt*_rrPrepHetro*_rrCircVag)), InsertVagProtectedLastAPM*InsertVagProtectedLastPCU);

    InsertVagProtectedRiskFactor = riskFactor;
    updateStats();
}

function recalcInsertVagUnprotectedRiskFactor()
{
   var riskFactor = Math.pow(1-(pIV/(_rrArt*_rrPrepHetro*_rrCircVag)), InsertVagUnprotectedLastAPM*(1-InsertVagUnprotectedLastPCU));

   InsertVagUnprotectedRiskFactor = riskFactor;
   updateStats();
}


function recalcReceptiveVagProtectedRiskFactor()
{
    var riskFactor = Math.pow(1-(pRV/(_rrCondom*_rrArt*_rrPrepHetro)), ReceptiveVagProtectedLastAPM*ReceptiveVagProtectedLastPCU);

    ReceptiveVagProtectedRiskFactor =  riskFactor;
    updateStats();
}
function recalcReceptiveVagUnprotectedRiskFactor()
{
    var riskFactor = Math.pow(1-(pRV/(_rrArt*_rrPrepHetro)), ReceptiveVagUnprotectedLastAPM*(1-ReceptiveVagUnprotectedLastPCU));

    ReceptiveVagUnprotectedRiskFactor = riskFactor;
    updateStats();
}

function recalcReceiveOralProtectedRiskFactor()
{
    var riskFactor = Math.pow(1-(pIO/(_rrCondom*_rrArt*_rrPrepHetro)), ReceiveOralProtectedLastAPM*ReceiveOralProtectedLastPCU);

    ReceiveOralProtectedRiskFactor = riskFactor;
    updateStats();
}

function recalcReceiveOralUnprotectedRiskFactor()
{
    var riskFactor =Math.pow(1-(pIO/(_rrArt*_rrPrepHetro)), ReceiveOralUnprotectedLastAPM*(1-ReceiveOralUnprotectedLastPCU));

    ReceiveOralUnprotectedRiskFactor = riskFactor;
    updateStats();
}

function recalcGiveOralProtectedRiskFactor()
{
    var riskFactor =Math.pow(1-(pRO/(_rrCondom*_rrArt*_rrPrepHetro)), GiveOralProtectedLastAPM*GiveOralProtectedLastPCU);

    GiveOralProtectedRiskFactor = riskFactor;
    updateStats();
}

function recalcGiveOralUnprotectedRiskFactor()
{
    var riskFactor =Math.pow(1-(pRO/(_rrArt*_rrPrepHetro)), GiveOralUnprotectedLastAPM*(1-GiveOralUnprotectedLastPCU));

    GiveOralUnprotectedRiskFactor = riskFactor;
    updateStats();
}

function recalcInsertAnalProtectedRiskFactor()
{
    var riskFactor =Math.pow(1-(pIA/(_rrCondom*_rrArt*_rrPrepMsm*_rrCircAnal)), InsertAnalProtectedLastAPM*InsertAnalProtectedLastPCU);

    InsertAnalProtectedRiskFactor = riskFactor;
    updateStats();
}

function recalcInsertAnalUnprotectedRiskFactor()
{
    var riskFactor =Math.pow(1-(pIA/(_rrArt*_rrPrepMsm*_rrCircAnal)), InsertAnalUnprotectedLastAPM*(1-InsertAnalUnprotectedLastPCU));

    InsertAnalUnprotectedRiskFactor = riskFactor;
    updateStats();
}

function recalcReceptiveAnalProtectedRiskFactor()
{
    var riskFactor =Math.pow(1-(pRA/(_rrCondom*_rrArt*_rrPrepMsm)), ReceptiveAnalProtectedLastAPM*ReceptiveAnalProtectedLastPCU);

    ReceptiveAnalProtectedRiskFactor = riskFactor;
    updateStats();
}

function recalcReceptiveAnalUnprotectedRiskFactor()
{
    var riskFactor =Math.pow(1-(pRA/(_rrArt*_rrPrepMsm)), ReceptiveAnalUnprotectedLastAPM*(1-ReceptiveAnalUnprotectedLastPCU));

    ReceptiveAnalUnprotectedRiskFactor = riskFactor;
    updateStats();
}


/**
 * resetCalculations - reset all calculations and rist factors to default.
 */
function resetCalculations() {
        InsertVagProtectedRiskFactor=1, InsertVagUnprotectedRiskFactor=1,
            ReceptiveVagProtectedRiskFactor=1, ReceptiveVagUnprotectedRiskFactor=1,
            InsertAnalProtectedRiskFactor=1, InsertAnalUnprotectedRiskFactor=1,
            ReceptiveAnalProtectedRiskFactor=1, ReceptiveAnalUnprotectedRiskFactor=1,
            GiveOralProtectedRiskFactor=1, GiveOralUnprotectedRiskFactor=1,
            ReceiveOralProtectedRiskFactor=1, ReceiveOralUnprotectedRiskFactor = 1;
        InsertVagProtectedLastAPM = 0, InsertVagUnprotectedLastAPM = 0,
            ReceptiveVagProtectedLastAPM = 0, ReceptiveVagUnprotectedLastAPM = 0,
            InsertAnalProtectedLastAPM = 0, InsertAnalUnprotectedLastAPM = 0,
            ReceptiveAnalProtectedLastAPM = 0, ReceptiveAnalUnprotectedLastAPM = 0,
            GiveOralProtectedLastAPM = 0, GiveOralUnprotectedLastAPM = 0,
            ReceiveOralProtectedLastAPM = 0, ReceiveOralUnprotectedRiLastAPM = 0;

        InsertVagProtectedLastPCU = 0, InsertVagUnprotectedLastPCU = 0,
            ReceptiveVagProtectedLastPCU = 0, ReceptiveVagUnprotectedLastPCU = 0,
            InsertAnalProtectedLastPCU = 0, InsertAnalUnprotectedLastPCU = 0,
            ReceptiveAnalProtectedLastPCU = 0, ReceptiveAnalUnprotectedLastPCU = 0,
            GiveOralProtectedLastPCU = 0, GiveOralUnprotectedLastPCU = 0,
            ReceiveOralProtectedLastPCU = 0, ReceiveOralUnprotectedLastPCU = 0;

        updateStats();
}


/**
 * updateStats - Calculate statistics for discordant couples and display them on
 * the tables and charts on the Discordant assessment page.
 */
function updateStats()
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
    var _riskProductByGO = GiveOralProtectedRiskFactor * GiveOralUnprotectedRiskFactor;
    var _riskProductByIA = InsertAnalProtectedRiskFactor * InsertAnalUnprotectedRiskFactor;
    var _riskProductByRA = ReceptiveAnalProtectedRiskFactor * ReceptiveAnalUnprotectedRiskFactor;

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

    labels = []
    data = []

    if (_ivContribPercent.toFixed(1) > 0)
    {
        labels.unshift("Insertive vaginal sex");
        data.unshift(_ivContribPercent.toFixed(1));
    }
    if (_rvContribPercent.toFixed(1) > 0)
    {
        labels.unshift("Receiving vaginal sex");
        data.unshift(_rvContribPercent.toFixed(1));
    }
    if (_roContribPercent.toFixed(1) > 0)
    {
        labels.unshift("Receiving oral sex");
        data.unshift(_roContribPercent.toFixed(1));
    }
    if (_goContribPercent.toFixed(1) > 0)
    {
        labels.unshift("Giving oral sex");
        data.unshift(_goContribPercent.toFixed(1));
    }
    if (_raContribPercent.toFixed(1) > 0)
    {
        labels.unshift("Receiving anal sex");
        data.unshift(_raContribPercent.toFixed(1));
    }
    if (_iaContribPercent.toFixed(1) > 0)
    {
        labels.unshift("Insertive anal sex");
        data.unshift(_iaContribPercent.toFixed(1));
    }

    actChart.config.data.labels = labels;
    actChart.data.datasets[0].data = data;

    // actChart.data.datasets[0].data[0] = _ivContribPercent.toFixed(1);
    // actChart.data.datasets[0].data[1] = _rvContribPercent.toFixed(1);
    // actChart.data.datasets[0].data[2] = _roContribPercent.toFixed(1);
    // actChart.data.datasets[0].data[3] = _goContribPercent.toFixed(1);
    // actChart.data.datasets[0].data[4] = _raContribPercent.toFixed(1);
    // actChart.data.datasets[0].data[5] = _iaContribPercent.toFixed(1);

    actChart.update();

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

    condomChart.data.datasets[0].data[0] = _unprotectedPercent.toFixed(1);
    condomChart.data.datasets[0].data[1] = _protectedPercent.toFixed(1);
    condomChart.update();

}
