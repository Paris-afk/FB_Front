import { faker } from '@faker-js/faker';
import { User, UserModel } from '../models/User';
import { Post, PostModel, PostType } from '../models/Post';
import { Comment, CommentModel } from '../models/Comment';

// Importar imágenes estáticas disponibles
import persona1 from '../images/persona1.jpg';
import persona2 from '../images/persona2.jpg';
import persona3 from '../images/persona3.jpg';
import persona4 from '../images/persona4.jpg';
import persona5 from '../images/persona5.jpg';
import paisaje1 from '../images/paisaje1.jpg';
import paisaje2 from '../images/paisaje2.jpg';

export class DataGenerator {
  private static avatars = [persona1, persona2, persona3, persona4, persona5];
  private static images = [paisaje1, paisaje2];
  private static sampleTexts = [
    "¡Qué hermoso día para salir y disfrutar del aire libre! 🌞",
    "Acabando de terminar un proyecto increíble. ¡Muy emocionado por compartirlo pronto!",
    "Nada como una buena taza de café para empezar el día ☕",
    "Reflexionando sobre lo rápido que pasa el tiempo. Cada momento cuenta.",
    "¡Feliz de estar rodeado de personas tan increíbles! 💕",
    "La tecnología sigue sorprendiéndome cada día. ¡El futuro es ahora!",
    "Recordatorio: siempre hay algo por lo que estar agradecido 🙏",
    "¿Alguien más piensa que los atardeceres son pura magia? 🌅",
    "Trabajando duro para alcanzar mis metas. ¡Cada paso cuenta!",
    "La vida es mejor cuando compartes momentos especiales con otros."
  ];

  static generateUser(id?: string): UserModel {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const randomAvatar = this.avatars[Math.floor(Math.random() * this.avatars.length)];
    
    const userData: User = {
      id: id || faker.string.uuid(),
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }),
      avatar: randomAvatar,
      isOnline: faker.datatype.boolean({ probability: 0.3 }),
      lastSeen: faker.date.recent({ days: 7 }),
      joinDate: faker.date.past({ years: 3 }),
      bio: faker.datatype.boolean({ probability: 0.7 }) ? faker.lorem.sentence() : undefined
    };

    return new UserModel(userData);
  }

  static generateUsers(count: number): UserModel[] {
    return Array.from({ length: count }, () => this.generateUser());
  }

  static generateComment(author: User, postId?: string): CommentModel {
    const commentData: Comment = {
      id: faker.string.uuid(),
      content: faker.lorem.sentences({ min: 1, max: 3 }),
      author,
      createdAt: faker.date.recent({ days: 30 }),
      updatedAt: faker.date.recent({ days: 30 }),
      likes: this.generateRandomUserIds(faker.number.int({ min: 0, max: 15 })),
      isEdited: faker.datatype.boolean({ probability: 0.1 })
    };

    return new CommentModel(commentData);
  }

  static generateComments(authors: User[], count: number): CommentModel[] {
    return Array.from({ length: count }, () => {
      const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
      return this.generateComment(randomAuthor);
    });
  }

  static generatePost(author: User, users: User[]): PostModel {
    const postTypes: PostType[] = ['text', 'image', 'text', 'text']; // Más probabilidad de texto
    const randomType = postTypes[Math.floor(Math.random() * postTypes.length)];
    const randomImage = this.images[Math.floor(Math.random() * this.images.length)];
    const randomText = this.sampleTexts[Math.floor(Math.random() * this.sampleTexts.length)];

    const postData: Post = {
      id: faker.string.uuid(),
      content: randomText,
      author,
      type: randomType,
      imageUrl: randomType === 'image' ? randomImage : undefined,
      createdAt: faker.date.recent({ days: 30 }),
      updatedAt: faker.date.recent({ days: 30 }),
      likes: this.generateRandomUserIds(faker.number.int({ min: 0, max: 50 })),
      comments: this.generateComments(users, faker.number.int({ min: 0, max: 8 })),
      shares: faker.number.int({ min: 0, max: 20 }),
      isEdited: faker.datatype.boolean({ probability: 0.1 }),
      privacy: 'public'
    };

    return new PostModel(postData);
  }

  static generatePosts(authors: User[], count: number): PostModel[] {
    return Array.from({ length: count }, () => {
      const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
      return this.generatePost(randomAuthor, authors);
    }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Ordenar por fecha desc
  }

  private static generateRandomUserIds(count: number): string[] {
    return Array.from({ length: count }, () => faker.string.uuid());
  }

  // Método para generar el usuario actual (logueado)
  static generateCurrentUser(): UserModel {
    return this.generateUser('current-user');
  }

  // Método para generar datos completos del feed
  static generateFeedData() {
    const currentUser = this.generateCurrentUser();
    const users = this.generateUsers(20); // 20 usuarios adicionales
    const allUsers = [currentUser, ...users];
    const posts = this.generatePosts(allUsers, 15); // 15 posts

    return {
      currentUser,
      users: allUsers,
      posts
    };
  }
}
