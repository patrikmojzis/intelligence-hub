/**
 * Intelligence Hub patch: suppress Metabase marketing upsell surfaces.
 *
 * This intentionally does not unlock or emulate any paid/enterprise features;
 * it only hides upsell UI in this forked build.
 */
export function UpsellWrapper<Props extends object>(
  _Component: React.ComponentType<Props>,
) {
  const WrappedComponent = (_props: Props) => null;

  return WrappedComponent;
}
