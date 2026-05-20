const CheckHistory = require("../models/CheckHistory");

// @desc    Get check history for the logged in user
// @route   GET /api/history
// @access  Private
const getHistory = async (req, res) => {
  try {
    const history = await CheckHistory.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      count: history.length,
      history,
    });
  } catch (error) {
    console.error("Get history error:", error.message);
    res.status(500).json({ error: "Server error fetching history" });
  }
};

// @desc    Delete a history record
// @route   DELETE /api/history/:id
// @access  Private
const deleteHistory = async (req, res) => {
  try {
    const record = await CheckHistory.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }

    if (record.userId.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "Not authorized to delete this record" });
    }

    await CheckHistory.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Delete history error:", error.message);
    res.status(500).json({ error: "Server error deleting record" });
  }
};

module.exports = { getHistory, deleteHistory };
