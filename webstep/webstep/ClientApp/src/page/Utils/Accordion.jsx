import React from "react";
import { Card, CardBody, CardHeader, Collapse, Button, Navbar } from "reactstrap";
import PropTypes from "prop-types";

export class Accordion extends React.Component {
  state = {
    open: this.props.open,
    //width: this.props.width

  };

  toggleSection = index => () => {
    this.setState(({ open, width }) => ({
      open: index === open ? undefined : index,
      //width: i
    }));
  };
//<Navbar className='sticky-top'>
  render() {
    return (
      <div className="accordion">
        
        {React.Children.map(this.props.children, (child, index) => {
          if (child.type !== AccordionItem) return null;
          return React.cloneElement(child, {
            isOpen: child.props.open || this.state.open === index,
            onClick: this.toggleSection(index)
          });
        })}
        
      </div>
    );
  }
}

Accordion.Accordion = undefined;

Accordion.Accordion = undefined;

Accordion.propTypes = {
  open: PropTypes.number
};

const AccordionItem = ({ children, isOpen, onClick }) => (
  <Card>
    {React.Children.map(children, child => {
      if (child.type === AccordionHeader) {
        return React.cloneElement(child, { onClick });
      }

      if (child.type === AccordionBody) {
        return React.cloneElement(child, { isOpen });
      }

      return null;
    })}
  </Card>
);

const AccordionHeader = ({ children, onClick }) => (
  <CardHeader>
    <h5 className="mb-0">
      <Button color="link" onClick={onClick}>
        {children}
      </Button>
    </h5>
  </CardHeader>
);

const AccordionBody = ({ children, isOpen }) => (
  <Collapse isOpen={isOpen}>
    <CardBody>{children}</CardBody>
  </Collapse>
);

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;
