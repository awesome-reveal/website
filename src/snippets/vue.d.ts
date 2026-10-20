// The site has no Vue integration, so `astro check` cannot read a .vue file. An .astro snippet imports
// a .vue path that has no file, and this declaration types it. Keep the .vue snippets off those paths.
declare module "*.vue" {
  const component: (props: Record<string, unknown>) => unknown;
  export default component;
}
