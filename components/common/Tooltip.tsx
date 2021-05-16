import ReachTooltip from "@reach/tooltip";
import "@reach/tooltip/styles.css";
import styled from "styled-components";


const StyledTooltip = styled(ReachTooltip)`
  background: hsla(0, 0%, 0%, 0.75);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5em 1em;
`;

export default function Tooltip({ children, label }) {
  return <StyledTooltip label={label}>{children}</StyledTooltip>;
}
