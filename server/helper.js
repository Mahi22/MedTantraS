function checkIf(name, value, max, min) {
  return {
    name,
    value,
    type: (max ? (value > max ? 'HIGH' : 'NORMAL') : (value < min ? 'LOW' : 'NORMAL')),
    max,
    min
  }
}

export function categorizeJson(json) {
  // const physicalExamination = [
  //   {type: 'General', values: []},
  //   {type: 'Cardovascular system', values: []},
  //   {type: 'Respiratory system', values: []},
  // ];
  // const investigations = [
  //   {type: 'HEMOGRAM', values: []},
  //   {type: 'APHC SUGAR GLUCOSE - SERUM / PLASMA (FASTING)', values: []},
  //   {type: 'AHC RENAL PARAMETERS', values: []},
  //   {type: 'LIPID PROFILE TEST (PACKAGE)', values: []},
  //   {type: 'AHC LFT PACKAGE BILIRUBIN, TOTAL - SERUM', values: []},
  //   {type: 'BILIRUBIN CONJUGATED (DIRECT) - SERUM', values: []},
  //   {type: 'URINE ROUTINE (CUE)', values: []},
  // ];

  const cardioVascular = [];

  cardioVascular.push(checkIf('BP SYSTOLIC', json.BP_SYSTOLIC, 139, null));
  cardioVascular.push(checkIf('BP DIASTOLIC', json.BP_DIASTOLIC, 89, null));

  return ({
    height: json.HEIGHT,
    weight: json.WEIGHT,
    gender: json.GENDER,
    age: json.AGE,
    mrn: json.MRN,
    visitNumber: json.VISIT_NUMBER,
    dot: json.DATE_OF_TEST,
    location: json.HEALTH_CHECK_LOCATION,
    cardioVascular
  });

}
