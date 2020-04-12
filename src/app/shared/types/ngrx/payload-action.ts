export interface ActionMetadata {
  metadata?: {
    [key: string]: any;
    /**
     * @description value used for ResourceFactory class to create a custom url (resource)
     */
    resource?: { [key: string]: string | number };
  };
}

export interface PayloadAction extends ActionMetadata {
  // Data represent values for the store or for the server
  data: any;
}
