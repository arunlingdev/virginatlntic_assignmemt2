import React, { useState } from 'react';
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  MobileStepper,
  Button,
  useTheme,
  Rating,
  Divider,
} from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from 'prop-types';
import './Cards.scss';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

/**
 * Component to display Hotel Cards results for all content
 * @constant
 * @type {function}
 * @param {array} holiday 
 * @returns {JSX}
 */
const Cards = ({ holiday }) => {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const maxSteps =
    (holiday?.hotel?.content?.images?.length > 0 && holiday?.hotel?.content?.images?.length < 20)
      ? holiday?.hotel?.content?.images?.length
      : 0;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <Card className='card' elevation={3}>
      <CardHeader
        title={holiday?.hotel?.name}
      />
      <AutoPlaySwipeableViews
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        /* eslint react/no-children-prop: 0 */
        children={
          holiday?.hotel?.content?.images.length > 0 &&
          holiday?.hotel?.content?.images.map((image, index) => (
            <div key={index}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component='img'
                  sx={{
                    maxWidth: 400,
                    height: 255,
                    display: "block",
                    overflow: "hidden",
                    width: "100%",
                  }}
                  src={"https:" + image?.RESULTS_CAROUSEL?.url}
                  alt={`hotel image ${index}`}
                />
              ) : null}
            </div>
          ))
        }
      />

      <MobileStepper
        steps={maxSteps}
        position='static'
        activeStep={activeStep}
        nextButton={
          <Button
            size='small'
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
      <Divider />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {holiday?.hotel?.content?.hotelDescription.substring(0, 100) + "..."}
        </Typography>
        <Divider />
        <Typography component='legend'>Hotel Facilities</Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          {holiday?.hotel?.content?.hotelFacilities?.map(
            (facility) => facility + ", "
          )}
        </Typography>

        <Typography component='legend'>Hotel Rating</Typography>
        <Rating
          name='read-only'
          value={holiday?.hotel?.content?.starRating}
          readOnly
        />
        <Typography component='legend'>Hotel Location</Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          {holiday?.hotel?.content?.parentLocation}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Cards;

Cards.propTypes = {
  holiday: PropTypes.array.isRequired,
};
