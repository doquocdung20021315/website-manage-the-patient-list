import { useEffect } from 'react';
import { RouteProps, useNavigate, useSearchParams } from 'react-router-dom';
import ErrorBoundary from '../components/base/error/ErrorBoundary';
import path from '../mocks/Path.json';
import { useAppSelector } from '../redux/store';
// export const hasAnyAuthority = (
//   authorities: Array<string>,
//   hasAnyAuthorities: Array<string>,
// ) => {
//   if (authorities && authorities.length !== 0) {
//     if (hasAnyAuthorities.length === 0) {
//       return true;
//     }
//     return hasAnyAuthorities.some((auth) => authorities.includes(auth));
//   }
//   return false;
// };

type IOwnProps = RouteProps & {
  hasAnyAuthorities?: Array<string>;
  children: React.ReactNode;
};

const PrivateRouter = ({
  children,
}: // hasAnyAuthorities = [],
// ...rest
IOwnProps) => {
  const isAuthenticated: boolean = useAppSelector(
    (state: { auth: { isAuthenticated: any } }) => state.auth.isAuthenticated,
  );
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectRouter = searchParams.get('return') || path.login.url;
  const startingData = async () => {
    // dispatch(getListUserAll() as any);
    // await dispatch(fetchUserInfo() as any);
  };
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(redirectRouter);
    } else {
      startingData();
    }
  }, [isAuthenticated]);

  return <ErrorBoundary>{children}</ErrorBoundary>;
};

export default PrivateRouter;
