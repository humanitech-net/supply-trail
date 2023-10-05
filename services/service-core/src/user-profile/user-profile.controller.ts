import { Controller, Get, Query } from '@nestjs/common';
import { KeycloakService } from '../auth/keycloak.service';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';

@Controller('user')
export class UserProfileController {}
