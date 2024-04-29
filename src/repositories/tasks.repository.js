import { PrismaClient } from "@prisma/client";

export class TaskRepository {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createTask({ name, feedback }) {
    const task = await this.prisma.task.create({
      data: {
        name,
        feedback,
      },
    });

    return task;
  }

  async getTasks() {
    const tasks = await this.prisma.task.findMany();
    return tasks;
  }

  async deleteTask(id) {
    await this.prisma.task.delete({ where: { id } });
  }
}
