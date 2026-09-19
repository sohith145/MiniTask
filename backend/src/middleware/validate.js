const validate = (schemas) => {
  return (req, res, next) => {
    const errors = {};

    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);

      if (!result.success) {
        errors.body = result.error.issues;
      } else {
        req.body = result.data;
      }
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);

      if (!result.success) {
        errors.params = result.error.issues;
      } else {
        req.params = result.data;
      }
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);

      if (!result.success) {
        errors.query = result.error.issues;
      } else {
        req.query = result.data;
      }
    }

    if (Object.keys(errors).length > 0) {
      return next({
        name: "ZodError",
        issues: errors,
      });
    }

    next();
  };
};

export default validate;