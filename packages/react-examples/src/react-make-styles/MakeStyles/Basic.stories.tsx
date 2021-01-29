import { ax, makeStyles } from '@fluentui/react-make-styles';
import { Provider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const useBasicStyles = makeStyles<{ primary?: boolean }>([
  [
    null,
    theme => ({
      border: `5px solid ${theme.neutralColorTokens.neutralStroke1}`,
      backgroundColor: theme.neutralColorTokens.neutralBackground1,
      color: theme.neutralColorTokens.neutralForeground1,

      margin: '5px',
      padding: '5px',
    }),
  ],
  [
    s => s.primary,
    theme => ({
      borderColor: theme.neutralColorTokens.brandForeground,
      color: theme.neutralColorTokens.brandForeground,
    }),
  ],
]);

const useOverrideStyles = makeStyles<{}>([
  [
    null,
    () => ({
      color: 'red',
      borderColor: 'red',
    }),
  ],
]);

const Container: React.FC<{ className?: string; primary?: boolean }> = props => {
  const className = ax(useBasicStyles({ primary: props.primary }), props.className);

  return <div className={className}>{props.children}</div>;
};

const ContainerWithOverrides: React.FC = props => {
  const className = useOverrideStyles({});

  return (
    <Container className={className} primary>
      {props.children}
    </Container>
  );
};

const PortalFrame: React.FunctionComponent<{
  children: (externalDocument: Document) => React.ReactElement;
}> = ({ children }) => {
  const [frameRef, setFrameRef] = React.useState<HTMLIFrameElement | null>(null);

  return (
    <>
      <iframe
        ref={setFrameRef}
        style={{ height: 300, width: 600, border: 0, padding: 20 }}
        title="An example of nested Provider in iframe"
      />
      {frameRef &&
        ReactDOM.createPortal(
          children(frameRef.contentDocument as Document),
          (frameRef.contentDocument as Document).body,
        )}
    </>
  );
};

export const Basic = () => (
  <Provider theme={webLightTheme}>
    <Container>Hello world!</Container>
    <Container primary>Hello world!</Container>
  </Provider>
);

export const Overrides = () => (
  <Provider>
    <ContainerWithOverrides>Hello world!</ContainerWithOverrides>
  </Provider>
);

export const Frame = () => (
  <PortalFrame>
    {externalDocument => (
      <Provider document={externalDocument} theme={webLightTheme}>
        <Container>Hello world!</Container>
        <Container primary>Hello world!</Container>
      </Provider>
    )}
  </PortalFrame>
);
