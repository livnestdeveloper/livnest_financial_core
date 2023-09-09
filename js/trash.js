const addkickerHeaders = new Headers();
addkickerHeaders.append("HTTP_DEVELOPER_ID", kickerDeveloperSelect.value);
addkickerHeaders.append("HTTP_PROJECT_ID", kickerProjectSelect.value);
addkickerHeaders.append("HTTP_START_DATE", kickerStartDate.value);
addkickerHeaders.append("HTTP_END_DATE", kickerEndDate.value);
addkickerHeaders.append("HTTP_TARGET_AMOUNT", kickerTargetAmount.value);
addkickerHeaders.append("HTTP_TARGET_UNIT", kickerTargetUnit.value);
addkickerHeaders.append("HTTP_TARGET_PERCENT", kickerTargetPercent.value);
