import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Agents',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Agency',
    path: '/agency',
    icon: icon('ic_user'),
  },
  {
    title: 'Admin',
    path: '/admin',
    icon: icon('ic_blog'),
  },
  {
    title: 'Report',
    path: '/report',
    icon: icon('ic_blog'),
  },
];

export default navConfig;
