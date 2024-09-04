export function timeAgo(date: Date): string {
    const currentDate = new Date();
    const elapsedMilliseconds = currentDate.getTime() - date.getTime();
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const elapsedDays = Math.floor(elapsedHours / 24);
    const elapsedMonths = Math.floor(elapsedDays / 30);
    const elapsedYears = Math.floor(elapsedMonths / 12);

    if (elapsedYears > 0) {
        return elapsedYears === 1 ? 'a year ago' : `${elapsedYears} years ago`;
    } else if (elapsedMonths > 0) {
        return elapsedMonths === 1 ? 'a month ago' : `${elapsedMonths} months ago`;
    } else if (elapsedDays > 0) {
        return elapsedDays === 1 ? 'a day ago' : `${elapsedDays} days ago`;
    } else if (elapsedHours > 0) {
        return elapsedHours === 1 ? 'an hour ago' : `${elapsedHours} hours ago`;
    } else if (elapsedMinutes > 0) {
        return elapsedMinutes === 1 ? 'a minute ago' : `${elapsedMinutes} minutes ago`;
    } else {
        return 'just now';
    }
}

export function truncateNumber(num: number): string {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + "K";
    } else {
        return num.toString();
    }
}

export enum incomeCategories {
    paycheck = "Paycheck",
    investments = "Investments",
    savings = "Savings"
}

export enum expenseCategories {
    food = "Food",
    shopping = "Shopping",
    entertainment = "Entertainment",
    rent = "Rent",
    utilities = "Utilities",
    others = "Others"
}