/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/': {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  '/listings': {
    get: {
      parameters: {
        query: {
          id?: parameters['rowFilter.listings.id'];
          server?: parameters['rowFilter.listings.server'];
          res?: parameters['rowFilter.listings.res'];
          item?: parameters['rowFilter.listings.item'];
          price?: parameters['rowFilter.listings.price'];
          qty?: parameters['rowFilter.listings.qty'];
          /** Filtering Columns */
          select?: parameters['select'];
          /** Ordering */
          order?: parameters['order'];
          /** Limiting and Pagination */
          offset?: parameters['offset'];
          /** Limiting and Pagination */
          limit?: parameters['limit'];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters['range'];
          /** Limiting and Pagination */
          'Range-Unit'?: parameters['rangeUnit'];
          /** Preference */
          Prefer?: parameters['preferCount'];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions['listings'][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** listings */
          listings?: definitions['listings'];
        };
        query: {
          /** Filtering Columns */
          select?: parameters['select'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters['rowFilter.listings.id'];
          server?: parameters['rowFilter.listings.server'];
          res?: parameters['rowFilter.listings.res'];
          item?: parameters['rowFilter.listings.item'];
          price?: parameters['rowFilter.listings.price'];
          qty?: parameters['rowFilter.listings.qty'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters['rowFilter.listings.id'];
          server?: parameters['rowFilter.listings.server'];
          res?: parameters['rowFilter.listings.res'];
          item?: parameters['rowFilter.listings.item'];
          price?: parameters['rowFilter.listings.price'];
          qty?: parameters['rowFilter.listings.qty'];
        };
        body: {
          /** listings */
          listings?: definitions['listings'];
        };
        header: {
          /** Preference */
          Prefer?: parameters['preferReturn'];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
}

export interface definitions {
  /** @description Listings */
  listings: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * @default extensions.uuid_generate_v4()
     */
    id: string;
    /** Format: text */
    server: string;
    /** Format: bigint */
    res: number;
    /** Format: text */
    item: string;
    /** Format: bigint */
    price: number;
    /** Format: bigint */
    qty: number;
  };
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: 'params=single-object';
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: 'return=representation' | 'return=minimal' | 'return=none';
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: 'count=none';
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description listings */
  'body.listings': definitions['listings'];
  /** Format: uuid */
  'rowFilter.listings.id': string;
  /** Format: text */
  'rowFilter.listings.server': string;
  /** Format: bigint */
  'rowFilter.listings.res': string;
  /** Format: text */
  'rowFilter.listings.item': string;
  /** Format: bigint */
  'rowFilter.listings.price': string;
  /** Format: bigint */
  'rowFilter.listings.qty': string;
}

export interface operations {}

export interface external {}
