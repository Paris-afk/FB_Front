export interface User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  avatar: string;
  isOnline: boolean;
  lastSeen: Date;
  joinDate: Date;
  bio?: string;
}

export class UserModel implements User {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  avatar: string;
  isOnline: boolean;
  lastSeen: Date;
  joinDate: Date;
  bio?: string;

  constructor(data: User) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.fullName = data.fullName;
    this.email = data.email;
    this.avatar = data.avatar;
    this.isOnline = data.isOnline;
    this.lastSeen = data.lastSeen;
    this.joinDate = data.joinDate;
    this.bio = data.bio;
  }

  getDisplayName(): string {
    return this.fullName;
  }

  getInitials(): string {
    return `${this.firstName[0]}${this.lastName[0]}`.toUpperCase();
  }

  isRecentlyActive(): boolean {
    const now = new Date();
    const timeDiff = now.getTime() - this.lastSeen.getTime();
    const hoursDiff = timeDiff / (1000 * 3600);
    return hoursDiff < 24;
  }
}
