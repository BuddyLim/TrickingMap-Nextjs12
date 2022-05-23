export type TrickingObjType = {
  classes?: Array<object>;
  origins?: Array<object>;
  tricks?: Array<TrickType>;
}

export type TrickType = {
  id: number,
  name: string,
  description: string,
  aliases: string,
  classId: number,
  uri: string,
  prerequisites: Array<number>
  progressesTo: Array<number>
  image: string
}

export type TrickingCardPropsType = {
  key: number,
  isControlVisible: object,
  setControlVisible: React.Dispatch<React.SetStateAction<object>>,
  progressionTrick: TrickType,
  selectedTrick: TrickType,
  setSelectedTrick: React.Dispatch<React.SetStateAction<TrickType>>,
  setShowOffCanvas: React.Dispatch<React.SetStateAction<boolean>>,
  trick: TrickType,
  isProgressionVisible: boolean
}