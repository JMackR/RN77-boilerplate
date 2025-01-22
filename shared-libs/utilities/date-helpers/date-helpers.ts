export function getCurrentWeekOfMonth() {
  const currentDate = new Date();
  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

  // Calculate the difference in days
  const dayOfMonth = currentDate.getDate();
  const dayOfWeek = startOfMonth.getDay(); // Get the day of the week of the 1st day of the month (0 is Sunday, 6 is Saturday)

  // Calculate the current week (add 1 to make it 1-based index)
  const currentWeek = Math.ceil((dayOfMonth + dayOfWeek) / 7);

  return currentWeek;
}
