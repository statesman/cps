import csv, simplejson, time

def parse_bool(val):
  """
  Convert a string output from Caspio to a proper boolean
  """
  return val == "TRUE"

def age_days(age, age_type):
  """
  Convert the age, stored in Caspio in an age field and age type
  field, into an age that is in days
  """
  multipliers = {
    "Weeks": 7,
    "Months": 30.4368,
    "Years": 365.242
  }
  return int(float(age) * multipliers[age_type])

def format_date(date_str):
  """
  Convert the age returned from Casip to an ISO8601 date, which
  can easily be parsed by JavaScript
  """
  after_google_refine = "%m/%d/%Y %H:%M"
  from_caspio = "%m/%d/%Y %I:%M:%S %p"

  parsed_str = time.strptime(date_str, after_google_refine)
  return time.strftime("%Y-%m-%dT%H:%M:%S", parsed_str)

def inv_count(count):
  """
  If the investigation count is unset, mark it as 0
  """
  if count == "":
    return 0
  else:
    return int(count)

cases = []

with open('../data/cps-reports.csv', 'rb') as input_file:

  input_data = csv.reader(input_file)
  next(input_data, None)

  for row in input_data:

    name = row[0]
    age = row[1]
    gender = row[2][0:1]
    county = row[3]
    date_of_death = format_date(row[4])
    caseid = str(row[5])
    tableid = str(row[6])
    previous_investigations = inv_count(row[7])
    drug_alcohol = parse_bool(row[8])
    others_removed = parse_bool(row[9])
    criminal_charges = parse_bool(row[10])
    age_type = row[11]
    fault = row[12]
    previous_cps_contact = parse_bool(row[13])
    previous_removal = parse_bool(row[14])
    other_cases = parse_bool(row[15])
    other_states = parse_bool(row[16])
    not_investigated = parse_bool(row[17])
    medical_neglect = parse_bool(row[18])
    no_convictions = parse_bool(row[19])
    previous_child_death = parse_bool(row[20])
    age_range = row[21]
    maltreatment_pattern = parse_bool(row[22])
    document_cloud_id = row[23]
    cause_of_death = row[25]
    justice = row[38]
    multiple_removals = parse_bool(row[39])

    cases.append({
      'id': caseid + '-' + tableid,
      'name': name,
      'age': str(age) + ' ' + age_type.lower(),
      'age_days': age_days(age, age_type),
      'gender': gender,
      'dod': date_of_death,
      'county': county,
      'prevInv': previous_investigations,
      'cod': cause_of_death,
      'drugsAlc': drug_alcohol,
      'justice': justice,
      'dc_id': document_cloud_id
    })

json_out = open('../../public/data/cps-reports.json', 'w')
json_out.write(simplejson.dumps(cases))
json_out.close()
