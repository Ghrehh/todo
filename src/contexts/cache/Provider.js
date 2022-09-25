import { useState } from "react";
import PT from "prop-types";
import Cache from "contexts/cache/Cache";
import CacheContext from "contexts/cache";

const CacheProvider = ({ children }) => {
  const [cache] = useState(new Cache());
  window.cache = cache;

  return (
    <CacheContext.Provider value={cache}>{children}</CacheContext.Provider>
  );
};

CacheProvider.propTypes = {
  children: PT.node.isRequired,
};

export default CacheProvider;
