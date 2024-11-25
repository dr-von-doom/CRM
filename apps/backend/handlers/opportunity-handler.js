/**
 * it returns an array of objects with the following structure:
 * {
 *  id: string,
 *  value: number,
 *  label: string
 * }
 * @param {string} groupBy "status" or "businessType"
 */
const getOpportunityOverview = (groupBy, db, res) => {
  if (!groupBy)
    return res
      .status(400)
      .json({ message: "groupBy query parameter is required" });

  const { "": opportunities } = db.get("opportunities").value();

  // Group opportunities by "groupBy" and count
  const result = opportunities.reduce((acc, opportunity) => {
    const key = opportunity[groupBy];
    acc[key] = acc[key] ? acc[key] + 1 : 1;
    return acc;
  }, {});

  // Return an array of id, value and label
  return res.json(
    Object.keys(result).map((key) => ({
      id: key,
      value: result[key],
      label: key,
    }))
  );
};

module.exports = {
  getOpportunityOverview,
};
