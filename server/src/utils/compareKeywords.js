function compareKeywords(skills, keywords) {
  const splittedKeywords = [
    ...new Set(
      keywords.map((item) => item.toLowerCase().split(/[^A-Za-z0-9]/)).flat()
    ),
  ];

  const matchedSkills = skills.filter((skill) => keywords.includes(skill));

  const percentage =
    (matchedSkills.length / splittedKeywords.length).toFixed(4) * 100;

  return percentage;
}

module.exports = compareKeywords;
