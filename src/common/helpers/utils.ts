import { EnvironmentService } from '../../environment';
import { white, red, yellow, green, gray, blue } from 'chalk';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { DATABASES } from '../../server.constants';

import * as url from 'url';
const URL = url.URL;

/**
 * Defines if the provided parameter is an empty object {} or not
 */
function isEmptyObject(value: object) {
    for (const key in value) {
        if (value.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

function getMethodColor(method: string) {
    let color;
    switch (method) {
        case 'POST':
            color = yellow;
            break;
        case 'GET':
            color = green;
            break;
        case 'PUT':
            color = blue;
            break;
        case 'PATCH':
            color = gray;
            break;
        case 'DELETE':
            color = red;
            break;
    }
    return color;
}

const getOrigin = (url: string) => {
    if (url) {
        const newURL = new URL(url);
        return newURL.host;
    } else {
        return null;
    }
};

const getDatabaseFromOrigin = (headers: any): string => {
    //  El req.headers.origin de postman es undefined, hay que filtrar que otras conexiones no lleguen aqui.
    let subdomainDB;

    if (headers.origin) {
        const origin = getOrigin(headers.origin);
        subdomainDB = origin.split('.')[0].toLowerCase();
        return subdomainDB;
    } else {
        return 'ams';
    }
};

const returnExtensionByMime = (mimeType: string): string => {
    console.log('Myme is');
    console.log(mimeType);
    switch(mimeType) {
        case 'text/csv':
            return 'csv';
        break;
        case 'text/html':
            return 'html';
        break;
        case 'text/plain':
            return 'txt';
        break;
        case 'text/css':
            return 'css';
        break;            
        case 'audio/mpeg':
            return 'mp3';
        break;
        case 'image/svg+xml':
            return 'svg';
        break;
        case 'image/gif':
            return 'gif';
        break;
        case 'image/vnd.adobe.photoshop':
            return 'psd';
        break;        
        case 'image/jpeg':
            return 'jpg';
        break;
        case 'image/png':
            return 'png';
        break;
        case 'application/javascript':
            return 'js';
        break;
        case 'application/msword':
            return 'doc';
        break;        
        case 'video/mpeg':
            return 'mpeg';
        break;
        case 'application/pdf':
            return 'pdf';
        break;
        case 'application/xhtml+xml':
            return 'xhtml';
        break;
        case 'application/vnd.ms-excel':
            return 'xls';
        break;
        case 'application/xml':
            return 'xml';
        break;
        case 'application/zip':
            return 'zip';
        break;
        case 'application/x-7z-compressed':
            return '7z';
        break;
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return 'docx';
        break;
        default:
            return '';
    }
};

const isUserOwner = (user: any, model: any) => {
    const creatorId = model.creator._id || model.creator;
    const userId = user._id.toString();
    if (creatorId.toString() !== userId) {
        throw new HttpException('You must be the creator', HttpStatus.FORBIDDEN);        
    }
};

// Remove the object properties if the value is null/undefined
const removeEmpty = (obj: any) => {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') removeEmpty(obj[key]);
    else if (obj[key] === undefined) delete obj[key];
  });
  return obj;
};

export {
    isEmptyObject,
    getMethodColor,
    getOrigin,
    getDatabaseFromOrigin,
    returnExtensionByMime,
    isUserOwner,
    removeEmpty
};
