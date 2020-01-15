import { CoursesActions, ECoursesActions } from '../actions/courses.actions';
import { initialCoursesState } from '../state/courses.state';
import { ICoursesState } from 'src/app/interfaces/courses-state';

export const coursesReducer = (
  state = initialCoursesState,
  acttion: CoursesActions
): ICoursesState => {
  console.log('[Courses] Reducer', acttion.type);
  switch (acttion.type) {
    case ECoursesActions.toCoursesRequest: {
      console.log('toCoursesRequest', acttion);
      return {
        ...state,
      };
    }
    case ECoursesActions.toCoursesRequestMore: {
      console.log('toCoursesRequestMore', acttion);
      return {
        ...state,
        count: state.count + state.step,
      };
    }
    case ECoursesActions.toCoursesSuccess: {
      console.log('toCoursesSuccess', acttion);
      return {
        ...state,
        courses: acttion.payload,
        next: acttion.payload.length >= state.count,
      };
    }
    case ECoursesActions.toCoursesSetFilter: {
      console.log('toCoursesSetFilter', acttion);

      let count: number = state.count;

      const wasEmptyFilter = state.textFragment === '';
      const willEmptyFilter = acttion.payload === '';

      if (wasEmptyFilter !== willEmptyFilter) { // XOR
        count = initialCoursesState.count;
      }

      return {
        ...state,
        count,
        textFragment: acttion.payload
      };
    }
    default:
      console.log('Default');
      return state;
  }
};
