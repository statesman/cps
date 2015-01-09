from documentcloud import DocumentCloud

"""
A script for the CPS project to:
- make them public
- get a total page count
- update them with some metadata that links back to the project
"""

client = DocumentCloud("@statesman.com", "")

project_name = "CPS fatality reports"

print ("Loading project, %s" % project_name)

cps_reports = client.projects.get(title=project_name)

page_count = 0

for report_id in cps_reports.document_ids:
    # Get the report Obj
    report = cps_reports.get_document(report_id)

    # Make it public
    report.access = "public"

    # Iterate the page counter
    page_count = page_count + report.pages

    # Update URLs
    report.published_url = ("http://projects.statesman.com/news/cps-missed-signs/docs.html?doc=%s" % report_id)
    report.related_article = "http://projects.statesman.com/news/cps-missed-signs/explorer.html"

    # And add source/description
    report.source = "Texas Department of Family and Protective Services"

    # Commit changes
    report.save()

    # Status update ...
    print ("Updated document %s" % report_id)

# Print final stats
print ("Finished updating project, %s" % project_name)
print ("Total pages in project: %s" % page_count)
