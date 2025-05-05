import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { format } from 'date-fns';
import type { SampleCase } from '../../types/Dashboard';

const SampleCases = ({ sampleCases }: { sampleCases: SampleCase }) => {
  return (
    <Card className="bg-white dark:bg-zinc-900  rounded-lg p-0 md:p-5">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">Sample Cases</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {sampleCases.map((caseItem, index) => (
            <div
              key={index}
              className="p-6 border rounded-xl shadow-md bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-zinc-800 dark:to-gray-900 transition-shadow"
            >
              {/* Top Section: Labels and Titles */}
              <div className="mb-4">
                <div className="mb-2">
                  <label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide">
                    Topic
                  </label>
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100">{caseItem.topic}</h4>
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide">
                    Category
                  </label>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{caseItem.category}</p>
                </div>
              </div>

              {/* Original, Cleaned & Suggested Text with Gradient Blocks */}
              <div className="mb-6 space-y-4">
                <div className="p-3 rounded-md bg-gradient-to-r from-sky-100 to-sky-50 dark:from-sky-800 dark:to-sky-900">
                  <h5 className="text-xs font-semibold text-sky-800 dark:text-sky-200 mb-1">Original Text</h5>
                  <p className="text-sm text-gray-800 dark:text-gray-200" dir="rtl">
                    {caseItem.original_text}
                  </p>
                </div>

                <div className="p-3 rounded-md bg-gradient-to-r from-emerald-100 to-emerald-50 dark:from-emerald-800 dark:to-emerald-900">
                  <h5 className="text-xs font-semibold text-emerald-800 dark:text-emerald-200 mb-1">Cleaned Text</h5>
                  <p className="text-sm text-gray-800 dark:text-gray-200" dir="rtl">
                    {caseItem.cleaned_text}
                  </p>
                </div>

                <div className="p-3 rounded-md bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-700 dark:to-amber-800">
                  <h5 className="text-xs font-semibold text-amber-800 dark:text-amber-200 mb-1">Suggested Text</h5>
                  <p className="text-sm text-gray-800 dark:text-gray-200" dir="rtl">
                    {caseItem.suggested_text}
                  </p>
                </div>
              </div>

              {/* Keywords Section */}
              <div className="mb-4">
                <h5 className="text-xs font-semibold text-red-600 dark:text-red-400 mb-2 uppercase tracking-wide">
                  Offensive Keywords
                </h5>
                <div className="flex flex-wrap gap-2">
                  {caseItem.offensive_keywords.map((keyword: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs rounded-full bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer: Severity and Timestamp */}
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 border-t pt-2 mt-4">
                <span>
                  <strong className="text-orange-600 dark:text-orange-300">Severity:</strong> {caseItem.severity}
                </span>
                <span>
                  <strong>Timestamp:</strong>{' '}
                  {format(new Date(caseItem.timestamp), 'MMM dd, yyyy HH:mm')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SampleCases;
