import { ax, makeStyles } from '@fluentui/react-make-styles';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { WindowProvider } from '@fluentui/react-window-provider';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const useBasicStyles = makeStyles<{ primary?: boolean }>([
  [
    null,
    tokens => ({
      background: tokens.color.body.background,
      color: tokens.color.body.contentColor,
      border: `5px solid ${tokens.color.body.borderColor}`,

      padding: '5px',
    }),
  ],
  [
    s => s.primary,
    tokens => ({
      background: tokens.color.brand.background,
      color: tokens.color.brand.contentColor,
      borderColor: tokens.color.brand.borderColor,
    }),
  ],
]);

const useOverrideStyles = makeStyles<{}>([
  [
    null,
    () => ({
      background: 'transparent',
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
  children: (externalDocument: Window) => React.ReactElement;
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
          children(frameRef.contentDocument?.defaultView as Window),
          (frameRef.contentDocument as Document).body,
        )}
    </>
  );
};

export const Basic = () => (
  <ThemeProvider>
    <Container>Hello world!</Container>
    <Container primary>Hello world!</Container>
  </ThemeProvider>
);

export const Overrides = () => (
  <ThemeProvider>
    <ContainerWithOverrides>Hello world!</ContainerWithOverrides>
  </ThemeProvider>
);

export const Frame = () => (
  <PortalFrame>
    {externalDocument => (
      <WindowProvider window={externalDocument}>
        <ThemeProvider>
          <Container>Hello world!</Container>
          <Container primary>Hello world!</Container>
        </ThemeProvider>
      </WindowProvider>
    )}
  </PortalFrame>
);
