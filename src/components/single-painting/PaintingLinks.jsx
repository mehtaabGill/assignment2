import React from 'react'
import External from '../../icons/External'

function PaintingLinks({ painting }) {
  return (
    <div className="pt-2">
      <div className="flex gap-3">
        {painting.museumLink && (
          <a
            href={painting.museumLink}
            target="_blank"
            className="text-sm text-black hover:font-semibold flex items-center"
          >
            <External />
            Museum Link
          </a>
        )}
        {painting.wikiLink && (
          <a
            href={painting.wikiLink}
            target="_blank"
            className="text-sm text-black hover:font-semibold flex items-center"
          >
            <External />
            Wikipedia
          </a>
        )}
      </div>
    </div>
  )
}

export default PaintingLinks