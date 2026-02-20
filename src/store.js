export const initialStore=()=>{
  return{
    characters: [],
    planets: [],
    vehicles: [],
    favorites: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_task':

      const { id,  color } = action.payload
      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
      case 'SET_CHARACTERS':
        return {
          ...store,
          characters: action.payload
        };
        case 'SET_PLANETS':
        return {
          ...store,
          planets: action.payload
        };
        case 'SET_VEHICLES':
        return {
          ...store,
          vehicles: action.payload
        };
        case "ADD_FAVORITE":
          return {
            ...store,
            favorites: [...store.favorites, action.payload]
          };
          case "REMOVE_FAVORITE":
            return {
              ...store,
              favorites: store.favorites.filter(
                fav => fav !== action.payload
              )
            };


    default:
      throw Error('Unknown action.');
  }    
}
