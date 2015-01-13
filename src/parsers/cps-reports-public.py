import csv

"""
Script to create a publicly-available version of the CPS data.
"""
# Setup the output file ...
with open('../../public/data/cps-reports.csv', 'wb') as publicfile:
    writer = csv.writer(publicfile)

    # ... and the input file
    with open('../data/cps-reports.csv', 'rb') as reportsfile:
        # Parse the CSV
        reports = csv.reader(reportsfile)

        # Skip the header ...
        next(reports, None)

        # ... we'll write our own
        writer.writerow([
            'Name',
            'Gender',
            'Date of death',
            'County',
            'Age',
            'Age type',
            'Cause of death',
            'Fault assignment',
            'Number of investigations',
            'Report URL'
        ])

        for report in reports:

            # Build the trimmed rows
            writer.writerow([
                report[0],
                report[2],
                report[4].split(" ")[0],
                report[3],
                report[1],
                report[11],
                report[25],
                report[12],
                report[7],
                ('http://projects.statesman.com/news/cps-missed-signs/docs.html?doc=%s' % report[23])
            ])

print "Done"
