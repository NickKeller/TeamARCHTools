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
var _rrCondom, _rrArt, _rrPrepHetro, _rrPrepMsm, _rrCircVag, _rrCircAnal;

function SetupRiskRatios();
{

    _rrCondom = RR_CONDOM;
    if (_hivPosPartner.isOnArt)
        _rrArt = RR_ART;
    else
        _rrArt = 1;
    if (_hivNegPartner.isOnPrep)
        _rrPrepHetro = RR_PREP_HET;
    else
        _rrPrepHetro = 1;

    if (_hivNegPartner.isOnPrep)
        _rrPrepMsm = RR_PREP_MSM;
    else
        _rrPrepMsm = 1;

    if (_hivNegPartner.isCircumcised && _hivNegPartner.isMale)
        _rrCircVag = RR_CIRC_VAG;
    else
        _rrCircVag = 1;

    if (_hivNegPartner.isCircumcised && _hivNegPartner.isMale)
        _rrCircAnal = RR_CIRC_ANAL;
    else
        _rrCircAnal = 1;

}

function calcInsertVagProtectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    var actsPerMonth = timesPerMonth;
    var percentCondomUsage = percentWithCondomUsage/100.0;

    var riskFactor = Math.pow(1-(pIV/(_rrCondom*_rrArt*_rrPrepHetro*_rrCircVag)), timesPerMonth*percentWithCondomUsage);

    return riskFactor;
}

function calcInsertVagUnprotectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
   NSUInteger actsPerMonth = timesPerMonth;
   double percentCondomUsage = percentWithCondomUsage/100.0;

   var riskFactor = pow(1-(pIV/(_rrArt*_rrPrepHetro*_rrCircVag)), actsPerMonth*(1-percentCondomUsage));

   return riskFactor;
}


function calcReceptiveVagProtectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    var actsPerMonth = timesPerMonth;
    var percentCondomUsage = selpercentWithCondomUsage/100.0;

    var riskFactor = pow(1-(pRV/(_rrCondom*_rrArt*_rrPrepHetro)), actsPerMonth*percentCondomUsage);

    return riskFactor;

}
function calcReceptiveVagUnprotectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    var actsPerMonth = timesPerMonth;
    var percentCondomUsage = selpercentWithCondomUsage/100.0;

    var riskFactor = pow(1-(pRV/(_rrArt*_rrPrepHetro)), actsPerMonth*(1-percentCondomUsage));

    return riskFactor;

}

function calcReceiveOralProtectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    var actsPerMonth = timesPerMonth;
    var percentCondomUsage percentWithCondomUsage/100.0;

    var riskFactor = pow(1-(pIO/(_rrCondom*_rrArt*_rrPrepHetro)), actsPerMonth*percentCondomUsage);

    return riskFactor;

}

function calcReceiveOralUnprotectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    var actsPerMonth = timesPerMonth;
    var percentCondomUsage percentWithCondomUsage/100.0;

    var riskFactor = pow(1-(pIO/(_rrArt*_rrPrepHetro)), actsPerMonth*(1-percentCondomUsage));

    return riskFactor;

}

function calcGiveOralProtectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    var actsPerMonth = timesPerMonth;
    var percentCondomUsapercentWithCondomUsage/100.0;

    var riskFactor = pow(1-(pRO/(_rrCondom*_rrArt*_rrPrepHetro)), actsPerMonth*percentCondomUsage);

    return riskFactor;

}

function calcGiveOralUnprotectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    var actsPerMonth = timesPerMonth;
    var percentCondomUsapercentWithCondomUsage/100.0;

    var riskFactor = pow(1-(pRO/(_rrArt*_rrPrepHetro)), actsPerMonth*(1-percentCondomUsage));

    return riskFactor;

}

function calcInsertAnalProtectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    var actsPerMonth = timesPerMonth;
    var percentCondomUsage = percentWithCondomUsage/100.0;

    var riskFactor = pow(1-(pIA/(_rrCondom*_rrArt*_rrPrepMsm*_rrCircAnal)), actsPerMonth*percentCondomUsage);

    return riskFactor;


}

function calcInsertAnalUnprotectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    var actsPerMonth = timesPerMonth;
    var percentCondomUsage = percentWithCondomUsage/100.0;

    var riskFactor = pow(1-(pIA/(_rrArt*_rrPrepMsm*_rrCircAnal)), actsPerMonth*(1-percentCondomUsage));

    return riskFactor;


}

function calcReceptiveAnalProtectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    var actsPerMonth = timesPerMonth;
    var percentCondomUsage = percentWithCondomUsage/100.0;

    var riskFactor = pow(1-(pRA/(_rrCondom*_rrArt*_rrPrepMsm)), actsPerMonth*percentCondomUsage);

    return riskFactor;


}

function calcReceptiveAnalUnprotectedRiskFactor(timesPerMonth, percentWithCondomUsage)
{
    var actsPerMonth = timesPerMonth;
    var percentCondomUsage = percentWithCondomUsage/100.0;

    var riskFactor = pow(1-(pRA/(_rrArt*_rrPrepMsm)), actsPerMonth*(1-percentCondomUsage));

    return riskFactor;


}
