import { PhotoDetails } from '../../../core/services/photodetails';
export interface State {
    ids: string[];
    entities: { [id: string]: PhotoDetails | null };
    selectedPhoto: string | null;
    uploadCount: number;
  }

export const initialState: State = {
    ids: [],
    entities: {},
    selectedPhoto: null,
    uploadCount: 0
  };
