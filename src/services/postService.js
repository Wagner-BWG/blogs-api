const validateInputFields = (title, content, categoryIds) => {
  const tests = [title, content, categoryIds];
  let testResult = true;
  tests.forEach((test) => {
    console.log(test);
    if (!test) testResult = false;
  });
  return testResult;
};

module.exports = { validateInputFields };