// Angular import
import { Injectable } from '@angular/core';

// Import PouchDB
import { PouchDBService } from './pouchdb.service';

// Declare emit for map reduce
declare var emit: any;

@Injectable()
/**
 * The GroupService class / service
 * @type {GroupService}
 */
export class GroupService
{
	/**
	 * The local db var
	 * @type {PouchDB}
	 */
	private _db;

	/**
	 * The GroupService constructor
	 * @param {PouchDBService} private pouchdbService Service use to call PouchDB methods
	 */
	constructor(private pouchdbService: PouchDBService)
	{
		this._db = this.pouchdbService.db;
	}

	/**
	 * Get a group function
	 * @param  {string} id id of the group
	 * @return {any}       Object with the docs
	 */
	public get(id: string): any
	{
		return this._db.get(id).then((response) =>
		{
			return response;
		}).catch((error) =>
		{
			throw error;
		});
	}

	/**
	 * Get all groups
	 * @return {any} [description]
	 */
	public getAll(): any
	{
		function mapFunction(doc)
		{
			emit(doc.type);
		}

		return this._db.query(mapFunction,
		{
			key: 'group',
			include_docs: true
		}).then((result) =>
		{
			return result;
		}).catch((err) =>
		{
			throw err;
		});
	}

	/**
	 * Add a group function 
	 * @param  {Object} obj Object of a new group
	 * @return {any}        Object with the docs
	 */
	public add(obj: Object): any
	{
		return this._db.put(obj).then((response) =>
		{
			return response;
		}).catch((error) =>
		{
			throw error;
		});
	}

	/**
	 * Remove a group function
	 * @param  {Object} doc Object of an existing group to remove
	 * @return {any}        Object with the docs
	 */
	public remove(doc: Object): any
	{
		return this._db.remove(doc).then((response) =>
		{
			return response;
		}).catch((error) =>
		{
			throw error;
		});
	}
}
