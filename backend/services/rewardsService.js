// backend/services/rewardsService.js

class RewardsService {
  constructor() {
    // In a real application, this would interact with a database
    this.playerScrap = {}; // userId: scrapAmount
  }

  /**
   * Calculates and awards scrap to a player based on their performance in a heist.
   * @param {string} userId - The ID of the player.
   * @param {object} performanceData - Data about the player's performance (e.g., time, objectivesCompleted).
   * @returns {number} The amount of scrap awarded.
   */
  awardScrap(userId, performanceData) {
    let scrapEarned = 0;

    // Example logic: More scrap for faster times and more objectives
    if (performanceData.time) {
      scrapEarned += Math.max(0, 100 - (performanceData.time / 1000)); // Max 100 scrap for time
    }
    if (performanceData.objectivesCompleted) {
      scrapEarned += performanceData.objectivesCompleted * 50; // 50 scrap per objective
    }

    scrapEarned = Math.floor(scrapEarned); // Ensure whole numbers
    this.playerScrap[userId] = (this.playerScrap[userId] || 0) + scrapEarned;

    console.log(`Player ${userId} earned ${scrapEarned} scrap. Total: ${this.playerScrap[userId]}`);
    return scrapEarned;
  }

  /**
   * Gets the current scrap balance for a player.
   * @param {string} userId - The ID of the player.
   * @returns {number} The player's current scrap amount.
   */
  getScrapBalance(userId) {
    return this.playerScrap[userId] || 0;
  }

  /**
   * Deducts scrap from a player's balance.
   * @param {string} userId - The ID of the player.
   * @param {number} amount - The amount of scrap to deduct.
   * @returns {boolean} True if deduction was successful, false otherwise (e.g., insufficient scrap).
   */
  deductScrap(userId, amount) {
    if (this.playerScrap[userId] && this.playerScrap[userId] >= amount) {
      this.playerScrap[userId] -= amount;
      console.log(`Player ${userId} spent ${amount} scrap. Remaining: ${this.playerScrap[userId]}`);
      return true;
    }
    console.log(`Player ${userId} has insufficient scrap to spend ${amount}. Current: ${this.playerScrap[userId]}`);
    return false;
  }
}

module.exports = new RewardsService(); // Export a singleton instance
