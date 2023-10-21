import UsersDao from '../daos/users.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateUserDto } from '../dto/create.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';


import shortid from 'shortid';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
    users: Array<CreateUserDto> = [];

    constructor() {
        log('Created new instance of UsersDao');
    }
}

export default new UsersDao();

async addUser(user: CreateUserDto) {
    user.id = shortid.generate();
    this.users.push(user);
    return user.id;
}

async getUsers() {
    return this.users;
}

async getUserById(userId: string) {
    return this.users.find((user: { id: string }) => user.id === userId);
}

async putUserById(userId: string, user: PutUserDto) {
    const objIndex = this.users.findIndex(
        (obj: { id: string }) => obj.id === userId
    );
    this.users.splice(objIndex, 1, user);
    return `${user.id} updated via put`;
}
async patchUserById(userId: string, user: PatchUserDto) {
    const objIndex = this.users.findIndex(
        (obj: { id: string }) => obj.id === userId
    );
    let currentUser = this.users[objIndex];
    const allowedPatchFields = [
        'password',
        'firstName',
        'lastName',
        'permissionLevel',
    ];
    async removeUserById(userId: string) {
        const objIndex = this.users.findIndex(
            (obj: { id: string }) => obj.id === userId
        );
        this.users.splice(objIndex, 1);
        return `${userId} removed`;
    }
    async getUserByEmail(email: string) {
        const objIndex = this.users.findIndex(
            (obj: { email: string }) => obj.email === email
        );
        let currentUser = this.users[objIndex];
        if (currentUser) {
            return currentUser;
        } else {
            return null;
        }
    }
    export interface CRUD {
        list: (limit: number, page: number) => Promise<any>;
        create: (resource: any) => Promise<any>;
        putById: (id: string, resource: any) => Promise<string>;
        readById: (id: string) => Promise<any>;
        deleteById: (id: string) => Promise<string>;
        patchById: (id: string, resource: any) => Promise<string>;
    }
    class UsersService implements CRUD {
        async create(resource: CreateUserDto) {
            return UsersDao.addUser(resource);
        }
    
        async deleteById(id: string) {
            return UsersDao.removeUserById(id);
        }
        const log: debug.IDebugger = debug('app:users-controller');
        class UsersController {
            async listUsers(req: express.Request, res: express.Response) {
                const users = await usersService.list(100, 0);
                res.status(200).send(users);
            }